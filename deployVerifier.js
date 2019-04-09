// const assert = require('assert');
// const ganache = require('ganache-cli');
const Web3 = require('web3');
// const provider = ganache.provider();
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let interface = [    {
  "constant": true,
  "inputs": [
    {
      "name": "a",
      "type": "uint256[2]"
    },
    {
      "name": "a_p",
      "type": "uint256[2]"
    },
    {
      "name": "b",
      "type": "uint256[2][2]"
    },
    {
      "name": "b_p",
      "type": "uint256[2]"
    },
    {
      "name": "c",
      "type": "uint256[2]"
    },
    {
      "name": "c_p",
      "type": "uint256[2]"
    },
    {
      "name": "h",
      "type": "uint256[2]"
    },
    {
      "name": "k",
      "type": "uint256[2]"
    },
    {
      "name": "input",
      "type": "uint256[39]"
    }
  ],
  "name": "verifyProof",
  "outputs": [
    {
      "name": "r",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}]
let bytecode = "608060405234801561001057600080fd5b506128e9806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fe6f64c14610046575b600080fd5b34801561005257600080fd5b50610247600480360381019080806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929080604001906002806020026040519081016040528092919082600260200280828437820191505050505091929192908060800190600280602002604051908101604052809291906000905b8282101561011b5783826040020160028060200260405190810160405280929190826002602002808284378201915050505050815260200190600101906100d9565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437820191505050505091929192908060400190600280602002604051908101604052809291908260026020028082843782019150505050509192919290806040019060028060200260405190810160405280929190826002602002808284378201915050505050919291929080604001906002806020026040519081016040528092919082600260200280828437820191505050505091929192908060400190600280602002604051908101604052809291908260026020028082843782019150505050509192919290806104e00190602780602002604051908101604052809291908260276020028082843782019150505050509192919290505050610261565b604051808215151515815260200191505060405180910390f35b600061026b6126ca565b6060600060408051908101604052808e600060028110151561028957fe5b602002015181526020018e60016002811015156102a257fe5b6020020151815250836000018190525060408051908101604052808d60006002811015156102cc57fe5b602002015181526020018d60016002811015156102e557fe5b60200201518152508360200181905250604080519081016040528060408051908101604052808e600060028110151561031a57fe5b6020020151600060028110151561032d57fe5b602002015181526020018e600060028110151561034657fe5b6020020151600160028110151561035957fe5b6020020151815250815260200160408051908101604052808e600160028110151561038057fe5b6020020151600060028110151561039357fe5b602002015181526020018e60016002811015156103ac57fe5b602002015160016002811015156103bf57fe5b6020020151815250815250836040018190525060408051908101604052808b60006002811015156103ec57fe5b602002015181526020018b600160028110151561040557fe5b6020020151815250836060018190525060408051908101604052808a600060028110151561042f57fe5b602002015181526020018a600160028110151561044857fe5b60200201518152508360800181905250604080519081016040528089600060028110151561047257fe5b6020020151815260200189600160028110151561048b57fe5b60200201518152508360a0018190525060408051908101604052808860006002811015156104b557fe5b602002015181526020018860016002811015156104ce57fe5b60200201518152508360e0018190525060408051908101604052808760006002811015156104f857fe5b6020020151815260200187600160028110151561051157fe5b60200201518152508360c0018190525060276040519080825280602002602001820160405280156105515781602001602082028038833980820191505090505b509150600090505b602781101561059e57848160278110151561057057fe5b6020020151828281518110151561058357fe5b90602001906020020181815250508080600101915050610559565b60006105aa83856105ce565b14156105b957600193506105be565b600093505b5050509998505050505050505050565b60006105d8612740565b6105e06127b0565b60006105ea610805565b92508260e0015151600187510114151561060357600080fd5b60408051908101604052806000815260200160008152509150600090505b8551811015610681576106728261066d8560e001516001850181518110151561064657fe5b90602001906020020151898581518110151561065e57fe5b90602001906020020151611f2d565b611fc7565b91508080600101915050610621565b6106a7828460e00151600081518110151561069857fe5b90602001906020020151611fc7565b91506106d0856000015184600001516106c38860200151612082565b6106cb61211d565b6121e7565b15156106df57600193506107fc565b610706836020015186604001516106f98860600151612082565b61070161211d565b6121e7565b151561071557600293506107fc565b61073c8560800151846040015161072f8860a00151612082565b61073761211d565b6121e7565b151561074b57600393506107fc565b6107978560c00151846060015161077b610776866107718b600001518c60800151611fc7565b611fc7565b612082565b8660a0015161078d8860800151612082565b8a604001516122f2565b15156107a657600493506107fc565b6107e86107b7838760000151611fc7565b86604001516107c98860e00151612082565b8660c001516107db8a60800151612082565b6107e361211d565b6122f2565b15156107f757600593506107fc565b600093505b50505092915050565b61080d612740565b604080519081016040528060408051908101604052807f23ab46aae8d2e2e9a9ec96e2235f428c2d1bc01dea5390035dba47be552cfb1681526020017f1541e5bfd8d3b4abc0063a23cc45d9753150f5d7555e6c95c7fe76d601a7864b815250815260200160408051908101604052807f2cb698730eb900c48c01f278b830f4bf458a7abcbda3534c0184736da774d35f81526020017f245084aac819959865f59f093398315685b536b8df6bb2932e1d7578d8bb21f4815250815250816000018190525060408051908101604052807f0154db975910fcb28997006c329fa8d59a576b772bfead69a0cf23ddc57dff6781526020017f2a5c92682ec4f0b5027abbd5931f39ff6e9371f790522412bc87deb86a23f9d88152508160200181905250604080519081016040528060408051908101604052807f0f3e0eb9639f6228483c946a4cc516628640f4fe4fe8c2168aacf446c08e556781526020017f1de844001c5c876797824a9309017ea6987cbdfa19ae1a4960a9d6e26f52211d815250815260200160408051908101604052807f1f35607f77bd0f87756d96adedd32d86f2eedb29a18be6feed6b1eb9fd0025e381526020017f267fd033fbc18a2d47bc6c4320ba6c204df6d59cad95e5822715a3be7a896fa88152508152508160400181905250604080519081016040528060408051908101604052807f11f88db6babcf0e5281b972399715d7e8945d67813d2129d326f1a7f380d52d781526020017f211ac74f8a8b07a9d0ab2dd271a6401bcc07b8ae896ea825456927906d46d428815250815260200160408051908101604052807f1bebd4b6bf0dee76e64e0822794b77ff1b622ca1792fa93cab91e17315d937cc81526020017f284f0b0c48f2b3840c01f26ac60b464d2f4d4f72e2752fbe36f5ad0656695fa5815250815250816060018190525060408051908101604052807f2919e4be760f615108967b49c97952a4612ebdab7a9ee77868ca6b25bbe9a33981526020017f2d42c4d2b6023682ca1e1d3391316d8a2ba089952738330fa94b9733416a7aac8152508160800181905250604080519081016040528060408051908101604052807f056087dc6dfbdc72bd546e228dd76a273df76b4c7ac1f908fe3b69249cba953381526020017f092cd971144fbae8e51e9347ed8f99688c79b792f7dcfa4982af65ceb4bc5b7f815250815260200160408051908101604052807f28f145586838e8247f8873457b5aaeb0ceb50944595802381532b70f423df9c081526020017f03332293c9c08b65a4add56505486833699872e475db1270eb78e54452834f3e8152508152508160a00181905250604080519081016040528060408051908101604052807f27826f53998a669e99fb32bd9c596a0bd9201b07ae3994b47eb1843898e07f4a81526020017f2323dd73a8ad4c26ce37aac7c4ffe422420b24c8c2e63cc5e9dda790a90066b4815250815260200160408051908101604052807f0d2c6486443110a67236eac2d5f3566ed86251f53a84e8993dc1b61b1c0c1ae581526020017f1ba76b79dd21987df18aa9e087c411557a56f50c8d2bbd6e9cee3eb0eeb0d7b88152508152508160c001819052506028604051908082528060200260200182016040528015610cdb57816020015b610cc86127ca565b815260200190600190039081610cc05790505b508160e0018190525060408051908101604052807f1e151f98cbc2ab4603daa3a7960529bc363531e398159f8f5e356c27fb2b638c81526020017e5f4294e53b3d5c1a93f6fb5d5eb1c5ff4797a19df6d6d99cf777e7060fa6c38152508160e001516000815181101515610d4b57fe5b9060200190602002018190525060408051908101604052807f16d19199465e2fab2feb6ca54170d63eb13b18b1fc39152678007eb1c63b0f2f81526020017f2979aa7aaaa2f150ef2911db37152af9af9760dea017ba5d133009fe048482ce8152508160e001516001815181101515610dc057fe5b9060200190602002018190525060408051908101604052807f2d9c42de583888b61b880e459479063ded8cc390c5e835a8f20a1620227b7b4d81526020017f2fea1095b2f3b5f9ad6aa231ba44d169f4bd9209e37b5ddacc710be4ed16c0638152508160e001516002815181101515610e3557fe5b9060200190602002018190525060408051908101604052807f18e98d58d1ecd65a8e73d788baf1e9610132a5e7cc2d7d30cb032c228a348d2581526020017f1841696f6b329edc812b4ef74f30d80d864917c1dfe7e47d40a407a531f0e2e98152508160e001516003815181101515610eaa57fe5b9060200190602002018190525060408051908101604052807f288994cfa586debcf495e9968f22fbe66cdabc5a4711ee7527d77ad8895c2d4481526020017f26b9a28ef71178f3c81403c9132749035d0bcfa2d05746629562e47637d07eee8152508160e001516004815181101515610f1f57fe5b9060200190602002018190525060408051908101604052807f2555900141e7baffc1f59583cc9f2b83c148c44b82f6b7855c5b2f35c6ebe37281526020017f1555d81a830091a09249fe7f20d89a5308df0c842826663344b362b4a62e287c8152508160e001516005815181101515610f9457fe5b9060200190602002018190525060408051908101604052807f2020329fc03fe78ee63424a2ff4b1442b46dc0e0a9c2599fd4894f52a0e362bc81526020017f2447f5f6d6946d3af6cf54085f7b22d480c6ab7cccece4f1e5c65831c36cda948152508160e00151600681518110151561100957fe5b9060200190602002018190525060408051908101604052807f0d442fb62835805a5c5c0e7e0d7698a5fa519242c1bbbb452d662606084c6b2781526020017f15fbd074587efa80e314bd18590492fcec5f6c60039158b841562a4ec406933a8152508160e00151600781518110151561107e57fe5b9060200190602002018190525060408051908101604052807f2ffbc803ad04ef9ff36e41c253e3f2c074b607c43f68fac59f94d7281607a82781526020017f2e4c3b9b834876d8398e5d5a2fdf5e06789d25ba7e02dbbf865c36291d3ed6588152508160e0015160088151811015156110f357fe5b9060200190602002018190525060408051908101604052807f065256e915b4b863ab18be908fa5a1c59a4312066f70b0aa6df8f4c229a7785b81526020017f0fb965e9a0cc3c76e1f765900ff9c36de8a0544c32095b1fd608227638b473ec8152508160e00151600981518110151561116857fe5b9060200190602002018190525060408051908101604052807f0d8a0b9bfd00e18bd2441272e5adcaa530178868ba096485516d069eedd954c181526020017f2b086a18ba4282ae9404cd88ddfcd6726ea21d3df4d8127506e561c29e03c7ad8152508160e00151600a8151811015156111dd57fe5b9060200190602002018190525060408051908101604052807f1c37bda99b1c566a1e168172986f4b83f994b633d1200bc7a194160c92434a2681526020017f1630b9534ca85107294ac64a916d0bff98551f2985ed3161f328b163b5b2dcb58152508160e00151600b81518110151561125257fe5b9060200190602002018190525060408051908101604052807f0de9f87961d6a1d2844ced8c64eb20a94eadaf396b6699afbf0016d9b263848a81526020017f1d35b909d33282d1faec3e2ea2a0256321c08138210509d3dfab9af0a50ce2bc8152508160e00151600c8151811015156112c757fe5b9060200190602002018190525060408051908101604052807f050afc52d2f4209ecb664c42de93f861e9f36d164867e87ba0ec2e4d17c203ef81526020017f08af287bedafa13120a55b7ebaa2bbf3db708f74f1285c8849147ed61bd70df18152508160e00151600d81518110151561133c57fe5b9060200190602002018190525060408051908101604052807f011693fea5a2fd32aa96291b1d41815cf3743f5f9680751d4d58f11fe2696c5781526020017f09ff0384554a1b986cb045575050fc4a98f565f648d0a452b0fc8f031b7670dd8152508160e00151600e8151811015156113b157fe5b9060200190602002018190525060408051908101604052807f064e4e1b57ca3b2ae09fbfbe6aa8d2d4ebf6f10894229c9407f2d99c2741313481526020017f1af721f7732d517399705e93315ca1bf9958744e04331588c4d11726663f5cca8152508160e00151600f81518110151561142657fe5b9060200190602002018190525060408051908101604052807f1a745ffc8196cd883b9aae454702e264ec01c7ae17391e3db1bec482ac3ee50881526020017f2423845fd6505e786640a184f43c4e91115156825d6ef8e75e4a55c3adbd59cc8152508160e00151601081518110151561149b57fe5b9060200190602002018190525060408051908101604052807f19cf89ce619a0cac879e247aa932282c7f536d4ce46190983f96118d8ace9b0381526020017f1d17fc402f8d37651ceb30dc3647999440b4eb45c6b0038c1166d66a724aec1a8152508160e00151601181518110151561151057fe5b9060200190602002018190525060408051908101604052807f16729cad2182e0ac8499e550473b5a99b7f814a2bb02a81bca1541e47fb952fa81526020017f13a1cde3d09aeb19365b3cb57e0e88acccd5363f48089511c0c1486726653b038152508160e00151601281518110151561158557fe5b9060200190602002018190525060408051908101604052807f1e844846148709523af63c1277b5847cb9e1149e61510a5ca6aa14b9c23fd11181526020017f07edd63b10431485b98ce471dc6c72f5de63aa5ac1c21c10a91f0a296a58bc578152508160e0015160138151811015156115fa57fe5b9060200190602002018190525060408051908101604052807f05607e71c637e1b2b723b372fba273d55ea71868ef8057ccb8824b9ad20f06ab81526020017f2a9a59170337e2bcede4f0430cec063ee27b4cbbf0c5d19b3a1be0cf07de87858152508160e00151601481518110151561166f57fe5b9060200190602002018190525060408051908101604052807f017518d67d6fb2290d2372d8786b41aafbfb9aec07c67e4f82181277a19f309681526020017f26b02ed5db7c66abcfcdb1cf34bc0cc700d0a4e5f62d9ff09e1f01cdcb61409f8152508160e0015160158151811015156116e457fe5b9060200190602002018190525060408051908101604052807f2d9f6630c71d9fabb77dda80fdfdaa74a316b6b74d61cc1d7f1ba48b376b052c81526020017f175a7b5332368e31be986481b1b679bef3e6003e8b1919e65444806e910a1d168152508160e00151601681518110151561175957fe5b9060200190602002018190525060408051908101604052807f2da508f6ecb2a42b3afc584fea389c0197801e9ddbf915d16306ef5835d4261981526020017e90309384096e447616bee7ac18ffcb014cd4d35c83749121dc4112a692cb558152508160e0015160178151811015156117cd57fe5b9060200190602002018190525060408051908101604052807f1811c10b2e1c187eb7882c60fbfff141550c9dced82ead7cf61b245b05cff75581526020017f27ac7c4ef0ec75fb03289bb35ded09836d266127120df5b9603c027c2f6abdb88152508160e00151601881518110151561184257fe5b9060200190602002018190525060408051908101604052807f05370d76194766aea6495665fd5a7d376017dc21085e4dc5fa4a799cefadc9f981526020017f0374c13c64504015ed31972ce6681e67f9b85860b81a16bf361a03aeb44752f08152508160e0015160198151811015156118b757fe5b9060200190602002018190525060408051908101604052807f10737e2ff665064a612d6e845d5b9951dda2c943bf48461bdb71d71d6d6a37be81526020017f14da4a43b52f8c3367f7381823fbde120c6044655c20b88bbcf9a6b54f8d26bf8152508160e00151601a81518110151561192c57fe5b9060200190602002018190525060408051908101604052807f17f2e2d6e45f2b7578ee07596d737c94b964ee48994eeb33138215af2c5738fc81526020017f25e4818301fc7b36bb7f3935b8c475a61f8ef2a1c0659d9b8b0d20d53c5381048152508160e00151601b8151811015156119a157fe5b9060200190602002018190525060408051908101604052807f1b2822279be62f88f18e7221c7e285bdddcf5b57b36de9fdeb1a272234823a8381526020017f045e894ef6b181a092e6ac9d8edc2a490d3d5f440f2811eeb6c29158e8fd9dcf8152508160e00151601c815181101515611a1657fe5b9060200190602002018190525060408051908101604052807f0384cd6b700ea44e9ca4e326de9c100d098c348eaac51b2ffcd112644061c79d81526020017f082333c8ee7fff9e6757bf5f2dd06333bc57ddbb48010faabe01492aaa56ca368152508160e00151601d815181101515611a8b57fe5b9060200190602002018190525060408051908101604052807f0ab3e2fecb86389895ee4d8fc4901fb5a0df28a4a52eeb2bc1a566bc896f28a981526020017f0e92e1d62dcc3b3b45462bfe6fa36a9d585770c370a29a6f7c763d64780c62be8152508160e00151601e815181101515611b0057fe5b9060200190602002018190525060408051908101604052807f2822269bfc5c1d3bcce7ba9df467fb4c4e2a7c49df0f6897ecd92db7584bd72a81526020017f01816eb72cb3bc8b41d82d625a06782617b016cc479c1c319f948a75494ec62d8152508160e00151601f815181101515611b7557fe5b9060200190602002018190525060408051908101604052807f049d3746e4bbb5d0c2bbac316499b9aa35cdc5f1ea973f2fa944d3babfd1958981526020017f11a7452c2f3e26555825d52bcaa777c14aa41dc1a26f94d0cc0bfebc757dd2238152508160e001516020815181101515611bea57fe5b9060200190602002018190525060408051908101604052807f0f5469401ac655020187b78a4b40a676505d93e0e12977b4eac95dc32ce44a5781526020017f1bcd821380d2534531e7128f60470c00c778e15bdc1d90f8d1e729d25832a4178152508160e001516021815181101515611c5f57fe5b9060200190602002018190525060408051908101604052807f1615751bf651d8446aa79c4139b311785b64e9e2b2e09cccc50d2f1e9e0e630781526020017f1e3fd663adf77d65790836678c5af1218e212a2871d6b7a1e73706b1f2c499128152508160e001516022815181101515611cd457fe5b9060200190602002018190525060408051908101604052807f129af66a293b0a3a7315fed77a0effc0bacbf8a609ec7dd026de6099e113e17081526020017f0b1a7efb59b0244b296984ef9c182b11024ec7a68a90177083c6b4c4dcce51d78152508160e001516023815181101515611d4957fe5b9060200190602002018190525060408051908101604052807f15c95381e6116f7993914cc9b2fa5368f54ac334b8c4cf2406315502123d9beb81526020017f26f3ddb35e89b26632ec4f0f077867b78306273fd0b38e571b66b8c1462f51098152508160e001516024815181101515611dbe57fe5b9060200190602002018190525060408051908101604052807f163177661f36dd07eff42045859c0c8118e0457ee8fd988a94968a696c4a35bf81526020017f1821498a113170352c90684e77bc8b1fdc7a3140d874e0404af94d0e4a8d24638152508160e001516025815181101515611e3357fe5b9060200190602002018190525060408051908101604052807f03cdba8e55bfa12bb4df97f6079e084ee79719b0fcf10cbc31e319fc3aaf169981526020017f0de9b16904b830c8019d231059bed8ec2811d76ee8e7aeaf540e5cf3a7f8d7b58152508160e001516026815181101515611ea857fe5b9060200190602002018190525060408051908101604052807f2413b4bf7016a6638f5a800c0c50aefc8a0f5ac95fe0202c16046932c680690581526020017f188a5c93ed7f98045f9c9e1cf4b8ce36f6ade54ee1d64125766b44b8751e8ffd8152508160e001516027815181101515611f1d57fe5b9060200190602002018190525090565b611f356127b0565b611f3d6127e4565b60008460000151826000600381101515611f5357fe5b6020020181815250508460200151826001600381101515611f7057fe5b60200201818152505083826002600381101515611f8957fe5b60200201818152505060608360808460076107d05a03fa90508060008114611fb057611fb2565bfe5b50801515611fbf57600080fd5b505092915050565b611fcf6127b0565b611fd7612807565b60008460000151826000600481101515611fed57fe5b602002018181525050846020015182600160048110151561200a57fe5b602002018181525050836000015182600260048110151561202757fe5b602002018181525050836020015182600360048110151561204457fe5b60200201818152505060608360c08460066107d05a03fa9050806000811461206b5761206d565bfe5b5080151561207a57600080fd5b505092915050565b61208a6127b0565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd479050600083600001511480156120c7575060008360200151145b156120ea5760408051908101604052806000815260200160008152509150612117565b60408051908101604052808460000151815260200182856020015181151561210e57fe5b06830381525091505b50919050565b61212561282a565b604080519081016040528060408051908101604052807f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c281526020017f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed815250815260200160408051908101604052807f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b81526020017f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa815250815250905090565b6000606080600260405190808252806020026020018201604052801561222757816020015b6122146127ca565b81526020019060019003908161220c5790505b509150600260405190808252806020026020018201604052801561226557816020015b612252612851565b81526020019060019003908161224a5790505b5090508682600081518110151561227857fe5b906020019060200201819052508482600181518110151561229557fe5b90602001906020020181905250858160008151811015156122b257fe5b90602001906020020181905250838160018151811015156122cf57fe5b906020019060200201819052506122e68282612439565b92505050949350505050565b6000606080600360405190808252806020026020018201604052801561233257816020015b61231f6127ca565b8152602001906001900390816123175790505b509150600360405190808252806020026020018201604052801561237057816020015b61235d612851565b8152602001906001900390816123555790505b5090508882600081518110151561238357fe5b90602001906020020181905250868260018151811015156123a057fe5b90602001906020020181905250848260028151811015156123bd57fe5b90602001906020020181905250878160008151811015156123da57fe5b90602001906020020181905250858160018151811015156123f757fe5b906020019060200201819052508381600281518110151561241457fe5b9060200190602002018190525061242b8282612439565b925050509695505050505050565b60008060006060600061244a612878565b60008751895114151561245c57600080fd5b88519550600686029450846040519080825280602002602001820160405280156124955781602001602082028038833980820191505090505b509350600092505b858310156126725788838151811015156124b357fe5b906020019060200201516000015184600060068602018151811015156124d557fe5b906020019060200201818152505088838151811015156124f157fe5b9060200190602002015160200151846001600686020181518110151561251357fe5b9060200190602002018181525050878381518110151561252f57fe5b9060200190602002015160000151600060028110151561254b57fe5b6020020151846002600686020181518110151561256457fe5b9060200190602002018181525050878381518110151561258057fe5b9060200190602002015160000151600160028110151561259c57fe5b602002015184600360068602018151811015156125b557fe5b906020019060200201818152505087838151811015156125d157fe5b906020019060200201516020015160006002811015156125ed57fe5b6020020151846004600686020181518110151561260657fe5b9060200190602002018181525050878381518110151561262257fe5b9060200190602002015160200151600160028110151561263e57fe5b6020020151846005600686020181518110151561265757fe5b9060200190602002018181525050828060010193505061249d565b602082602087026020870160086107d05a03fa9050806000811461269557612697565bfe5b508015156126a457600080fd5b60008260006001811015156126b557fe5b60200201511415965050505050505092915050565b610240604051908101604052806126df6127ca565b81526020016126ec6127ca565b81526020016126f9612851565b81526020016127066127ca565b81526020016127136127ca565b81526020016127206127ca565b815260200161272d6127ca565b815260200161273a6127ca565b81525090565b61032060405190810160405280612755612851565b81526020016127626127ca565b815260200161276f612851565b815260200161277c612851565b81526020016127896127ca565b8152602001612796612851565b81526020016127a3612851565b8152602001606081525090565b604080519081016040528060008152602001600081525090565b604080519081016040528060008152602001600081525090565b606060405190810160405280600390602082028038833980820191505090505090565b608060405190810160405280600490602082028038833980820191505090505090565b60806040519081016040528061283e61289b565b815260200161284b61289b565b81525090565b60806040519081016040528061286561289b565b815260200161287261289b565b81525090565b602060405190810160405280600190602082028038833980820191505090505090565b60408051908101604052806002906020820280388339808201915050905050905600a165627a7a72305820fc9e656ff5ebd160f5063a668f30ef132a076f017caf5cdc9f3e1cbe87abb40f0029"

var verifier;
let accounts;

async function deployContract() {
  accounts = await web3.eth.getAccounts();

  const contractJson = interface;

  verifier = await new web3.eth.Contract(contractJson)
    .deploy({data: bytecode})
    .send({ from : accounts[0], gas: '6700000' })
};

deployContract();

// describe('Lottery Contract', () => {
//   it('deploys a contract', () => {
//     assert.ok(lottery.options.address);
//   });

//   it('allows one account to enter', async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei('0.02', 'ether')
// });

// const players = await lottery.methods.getPlayers().call({
//   from: accounts[0]
// });

// assert.equal(accounts[0], players[0]);
// assert.equal(1, players.length);
// });
// });