# snappframes

roll_up for ERC721 tokens. 

PoC use case: crowdfunding an indie movie by selling unique movie frames.

## Motivation

NFTs are an elegant solution for ensuring scarcity of unique digital artwork. However, as the CryptoKitties craze has shown, a really successful token can place significant computational burden on the chain. `snappframes` takes costly token transactions off-chain, thus saving on gas costs while still providing a guarantee of valid state transitions.

roll_up (github.com/barryWhiteHat/roll_up) has been mostly used for ERC20 tokens, where each leaf in the Merkle tree represents an account with a balance. `snappframes` is a 'twist' on this which instead uses each leaf to represent a unique token; accounts move from leaf to leaf to represent token transfers.

## Overview

At the most abstract level, we want to be able to do the following: 

A movie is specified as Movie: JPEGFile[n-1]   

### MoviePromoter requirements:  
- setup initial ownership of all frames to self 
- sell blocks of frames to owners (initial owners can be wholesale, who onsell to retail owners) 

### Owner requirements: 
  - independently of the archival storage of the whole movie, and however ownership is currently recorded 
  - can prove ownership of a particular image 
  - can prove an image to be part of a particular movie at particular frameNo 
  - can transfer ownership, together with ability to do the above proofs, of sub-blocks owned  

### Implementation Requirements:
  - image storage can be outsourced (e.g. to IPFS)  
  - ownership can be recorded either on or off chain 
  - owner can transfer between on and off chain recording of ownership
  - off chain transfers can be processed in bulk with efficient on chain computations 


## Data structures for ownership proofs: 

1. A generic fixed size Merkle tree 

   An array of size n, with entries HashValue, over the top of which we compute a Merkle tree. 

   By storing HashValue, rather than a data value, the structure is
   generic and can store any type of data.


2. A Merkle tree to record a fixed movie: 
   = a generic fixed size Merkle tree TM over the top of [Hash(Movie[i])]_{i=0..n-1} 
    
   Movie contract stores only the root of this tree. (This never changes after initialization.) 

   An index in binary is also a sequence of length log(n) of directions (0,1) from the root of the tree to the leaf. 

   To prove that a particular JPEG image I is at index i, present the Merkle path from root to leaf i and show hash(I) is stored at this leaf.  
   This proof is robust to loss of all other data about the movie. 

 3. A Merkle tree to record ownership of frames in a movie 
    = a generic fixed size Merkle tree TO over the top of [Hash(OwnershipPublicKey[i])]_{i=0..n-1}  

   The smart contract stores the root of this tree. 

   To prove ownership of the frame at index i, present 
         -- the Merkle path to leaf i in TO, 
         -- a key K such that the value stored at leaf i is Hash(K) 
   and sign a challenge that verifies using K 


   To prove ownership of a particular image I, and that it is at frame i, 
   present both a proof of ownership of the frame at index i and a proof that I is the image at frame i. 

   ![](https://i.imgur.com/tm84d5O.png)

   We segment this tree into subtrees to represent intuitive ranges of coins which can be owned by the same owner. 

## SNARK proofs

![](https://i.imgur.com/ZXVs8IP.png)
     
To transfer ownership, together with ability to produce the two types of proofs, use K to sign the message "transfer to key K2". The smart contract/offchain process needs to verify the signature, rebuild the Merkle tree TO and return the new path to index i in TO to the owner of K2, so that they have the proof material they need.     

We provide segmented SNARK proofs so that users have the option of just updating their segment without affecting or needing to know the state of other segments. 


## Demo

### SNARK setup and proof generation

The main update circuit is `/circuits/transfer_range.circom`. The main input file, `input.json`, is generated by `/test/generate_circuit_input.js`.

Through a series of steps (see https://iden3.io/blog/circom-and-snarkjs-tutorial2.html), we can:
- compile the circuit,
- perform the trusted setup,
- calculate the witness of our `input.json`,
- create a SNARK proof, and 
- check whether it is valid.

![](https://i.imgur.com/IvTnpBb.png)

### Smart contracts
