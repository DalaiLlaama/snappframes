//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.4.17;
library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    /// @return the generator of G1
    function P1() pure internal returns (G1Point) {
        return G1Point(1, 2);
    }
    /// @return the generator of G2
    function P2() pure internal returns (G2Point) {
        // Original code point
        return G2Point(
            [11559732032986387107991004021392285783925812861821192530917403151452391805634,
             10857046999023057135944570762232829481370756359578518086990519993285655852781],
            [4082367875863433681332203403145435568316851327593401208105741076214120093531,
             8495653923123431417604973247489272438418190587263600148770280649306958101930]
        );

/*
        // Changed by Jordi point
        return G2Point(
            [10857046999023057135944570762232829481370756359578518086990519993285655852781,
             11559732032986387107991004021392285783925812861821192530917403151452391805634],
            [8495653923123431417604973247489272438418190587263600148770280649306958101930,
             4082367875863433681332203403145435568316851327593401208105741076214120093531]
        );
*/
    }
    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point p) pure internal returns (G1Point) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }
    /// @return the sum of two points of G1
    function addition(G1Point p1, G1Point p2) view internal returns (G1Point r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
    }
    /// @return the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point p, uint s) view internal returns (G1Point r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success);
    }
    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] p1, G2Point[] p2) view internal returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++)
        {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[0];
            input[i * 6 + 3] = p2[i].X[1];
            input[i * 6 + 4] = p2[i].Y[0];
            input[i * 6 + 5] = p2[i].Y[1];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(sub(gas, 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
        return out[0] != 0;
    }
    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(G1Point a1, G2Point a2, G1Point b1, G2Point b2) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
            G1Point a1, G2Point a2,
            G1Point b1, G2Point b2,
            G1Point c1, G2Point c2
    ) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
            G1Point a1, G2Point a2,
            G1Point b1, G2Point b2,
            G1Point c1, G2Point c2,
            G1Point d1, G2Point d2
    ) view internal returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}
contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G2Point A;
        Pairing.G1Point B;
        Pairing.G2Point C;
        Pairing.G2Point gamma;
        Pairing.G1Point gammaBeta1;
        Pairing.G2Point gammaBeta2;
        Pairing.G2Point Z;
        Pairing.G1Point[] IC;
    }
    struct Proof {
        Pairing.G1Point A;
        Pairing.G1Point A_p;
        Pairing.G2Point B;
        Pairing.G1Point B_p;
        Pairing.G1Point C;
        Pairing.G1Point C_p;
        Pairing.G1Point K;
        Pairing.G1Point H;
    }
    function verifyingKey() pure internal returns (VerifyingKey vk) {
        vk.A = Pairing.G2Point([16133568278445841359592841217508839837008178989611385066168266097391722887958,9615000551556963294890077096943434966282992861786963777925073406708876281419], [20224383670842443827310512704003269494034605790979453142266422873218400703327,16425525948961553625417831928165660345173474167605829300455141201701532017140]);
        vk.B = Pairing.G1Point(602243564806326591090208271543783081651211024943301335764338115918761426791,19160700034183266417389983577559800891175893357307614716534045720540946364888);
        vk.C = Pairing.G2Point([6894338869295727558919736417749747750909777376890629151771376184349214791015,13527450449681700544057702558693700264772094367880649010697731647458031837469], [14116007204686968784546269911542464315886286375105144492504867063784833820131,17413714788101392875371062975562194033362074729624584713424844441934600171432]);
        vk.gamma = Pairing.G2Point([8128474570591570875109732184616047504415587986555266050812569030209934545623,14973637618881116684123953934122539051894096392076064444911699986221546001448], [12629124069027304620576518579389515278826315176703021375311639474452261582796,18232171111859649095615213690403294587623759724763763782743780438662569353125]);
        vk.gammaBeta1 = Pairing.G1Point(18590576701523493979336778060305829259475072060253122515605477858943007564601,20472048515562879326278373046386486903976480462725695345218204521193265593004);
        vk.gammaBeta2 = Pairing.G2Point([2432119239662789786205003044522426401017739791802019405206090884390781097267,4150057635669918246985817201555506621457226078568692137154676060126569061247], [18518802689891369852581651174269321780498777447363150621845829921244954098112,1447286389788426562786301188537815262729610852887733511220574552525214273342]);
        vk.Z = Pairing.G2Point([17870659560858361671244008011290706892451639330477993689272621575313343676234,15894317751781829924821776794093538956842068112563971401976723631108995966644], [5958502096881664434016556694516255931446627342029562220067074600394015120101,12508252143866672901164900319466976001855303137511134452375179411787839756216]);
        vk.IC = new Pairing.G1Point[](40);
        vk.IC[0] = Pairing.G1Point(13606707319365459042140011745339306208395043649989525074496185200671722267532,168310000625826012500906918781159427119211076447750043831457763242921666243);
        vk.IC[1] = Pairing.G1Point(10321158590873273949436621484109246330851331853047964980138099536293122477871,18759791890714674513735020903137279896950510791973399561719674604098901279438);
        vk.IC[2] = Pairing.G1Point(20630167838010202134183720731163439702409468087946669149953774597869898791757,21672260560391108983031602117553296975868156984804421357464908272495234564195);
        vk.IC[3] = Pairing.G1Point(11268159272909659229286974500012627311911686631151222349653257116953817156901,10971081112418720661144119720075434414124824507312585624221845437729081451241);
        vk.IC[4] = Pairing.G1Point(18335599047805589746029225313211644059221632846494877656981752071063875628356,17515876890388054465192819182393144782263458362035487434066141862005916597998);
        vk.IC[5] = Pairing.G1Point(16886751283461530888698164602511948371715006351341571996071972463932418548594,9650243312720421154069791705900468385606430217440880028499931368385097377916);
        vk.IC[6] = Pairing.G1Point(14530899654932541128456174737098902293524660652321643418879499027113681576636,16410406273196588688088002902229577089962267040565429749689500129859350616724);
        vk.IC[7] = Pairing.G1Point(6000541925010486618579595866739540126493546155734260575461345396326904130343,9943487133421632053243965116812650226072346261400836757014179192206541624122);
        vk.IC[8] = Pairing.G1Point(21703562945043149859919421039866359878765679505615294786187066050690538776615,20941082807405325392401111131784201253559628727065650695694269783785783350872);
        vk.IC[9] = Pairing.G1Point(2859358384950725412198215394502386489740244118696628763123112843887705028699,7112262810715580781528247049271595213626023013136552610425563587185680348140);
        vk.IC[10] = Pairing.G1Point(6123972051167800421764311845290695866380844210256818449070025888408222127297,19464319517365608659404730140133453847404553131166154118388644788365932349357);
        vk.IC[11] = Pairing.G1Point(12763245351519862780904064393169680833396050070171283949460029502199351691814,10036970396763928184988521216408791204197171951401814846695615724945946107061);
        vk.IC[12] = Pairing.G1Point(6293457303226964206820041949440447469752468481661213775734337286008935253130,13211992591303328459995456566035018036915348979145808236620244967134933607100);
        vk.IC[13] = Pairing.G1Point(2280974186575143160769787459560599619128725982836808437932965794716057732079,3927980435960923021978305031106792307547103002717732665830886896613832723953);
        vk.IC[14] = Pairing.G1Point(492204905991400446009916799877205886805255902661634870420166856968715725911,4521385911701916905228971146470392103180843753409626446248308416484035948765);
        vk.IC[15] = Pairing.G1Point(2852230235931284418789981780459267227647089228708011966780628835857827180852,12196779717031014257691053800763676349781687622811735051754518825548132605130);
        vk.IC[16] = Pairing.G1Point(11965750796136046229048947911669251509045633960633489423178408464898550850824,16346015810547435482859060862618776104196032843561961826703714524881900886476);
        vk.IC[17] = Pairing.G1Point(11674509660267973589377803397284713354412499893091658052949309252571440782083,13159451061928376782478751522843543406431630235519148434935755081220103007258);
        vk.IC[18] = Pairing.G1Point(10153384574246614663007261463626146439064584339355287903809806776364703503098,8879827500389053146145247898382450044119448987794196340030217443415039490819);
        vk.IC[19] = Pairing.G1Point(13803108085143770594633416531938167412880995900185888098456969503479882043665,3586411260503000193459912335003892453680372189731842430458099153326136933463);
        vk.IC[20] = Pairing.G1Point(2432054248523547957478254076091942738959038512845981734103945349576721893035,19269848964315624119672357486462768172365024256928036960021967839457378731909);
        vk.IC[21] = Pairing.G1Point(659205379713232601392899892022900854688672423639341919202477544859710206102,17499176575480278372064696009342370201039423802788239001509185439431399653535);
        vk.IC[22] = Pairing.G1Point(20635712162720895777056454144632709281100839247376639234225332113690097026348,10563062911009467527503258074666672707086894149115747890612061796015941491990);
        vk.IC[23] = Pairing.G1Point(20645669822980264930529768796127488891129152316930973863183592738795711374873,254761238169995440092679565936727920451417592593059943588522187241745992533);
        vk.IC[24] = Pairing.G1Point(10886877104559893082613658216033356808688972775544258402792189685326064645973,17944956734684337675624354438549471550468790136134790460183358055709145742776);
        vk.IC[25] = Pairing.G1Point(2358833738117538082678364527935652584181096726970405872175012907952647293433,1563226470470064594873082307678004378231573025314452085526854623874458800880);
        vk.IC[26] = Pairing.G1Point(7441063902887348228046559829494910474971212524928557429363375700398918219710,9431942186414189516693769738895342675327474918463692267346578618619395909311);
        vk.IC[27] = Pairing.G1Point(10832338095244810447387903439912504191589425684846675799164280168082182715644,17139310385591254452140520922502530398687753041890771786359195726363822883076);
        vk.IC[28] = Pairing.G1Point(12283356521571136863676004874948945588304635842088890362095580417157228542595,1976282686527429655535431308052653041768549067362710540006358154179117948367);
        vk.IC[29] = Pairing.G1Point(1591580112816931311442974807757878728119828821355566612372165724361982068637,3680699842103375257732002956096936916257064650031970178021329550841346443830);
        vk.IC[30] = Pairing.G1Point(4840960774362433360120725798933862666755544981851477820445393480379448371369,6591898218803057235335453339553975201599369849785703569680220223225073525438);
        vk.IC[31] = Pairing.G1Point(18152853215262623133783234573590458226602438294721460136333163466180981937962,681000250415745158313872911552081040027281948651951388083154855829863056941);
        vk.IC[32] = Pairing.G1Point(2087027890837034079474787299415986729808705029433889942325871543569664284041,7984859297444345317337778561554520018255091175267400850707492749600769298979);
        vk.IC[33] = Pairing.G1Point(6933834293813088477418857969474497046982114065567118050334770969843916360279,12575548312858326855834836234697254463929231650984688527277887306983086924823);
        vk.IC[34] = Pairing.G1Point(9988794715373833869991251713753029993630297901072947266938192151927212368647,13682176483652800961812806647744910657574880984200798035243446507984826702098);
        vk.IC[35] = Pairing.G1Point(8415426414172414961040764112442933170252696233618846858903071619180639019376,5022255754531731811114906711439625099737448279001779142985796644633320509911);
        vk.IC[36] = Pairing.G1Point(9854282427277952696720278037049169885345417777062757750734225578495877946347,17618762204634364909254117993902259945047792250106236369923726087121617768713);
        vk.IC[37] = Pairing.G1Point(10038282236023080039198924926963046561167102412619252755858570149144874857919,10914321868902682481813517339938655257047482930380043229514251044640095282275);
        vk.IC[38] = Pairing.G1Point(1720429756192674358754814122101713693542781626837940491456059684892227606169,6292966838070629343050723185669573135044284381710313607293555777545608681397);
        vk.IC[39] = Pairing.G1Point(16318080118724909329562799788894254227611361750681133729532381000401254639877,11099972209725377338633298771348140796544658071799891891917614568385737035773);

    }
    function verify(uint[] input, Proof proof) view internal returns (uint) {
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.IC.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++)
            vk_x = Pairing.addition(vk_x, Pairing.scalar_mul(vk.IC[i + 1], input[i]));
        vk_x = Pairing.addition(vk_x, vk.IC[0]);
        if (!Pairing.pairingProd2(proof.A, vk.A, Pairing.negate(proof.A_p), Pairing.P2())) return 1;
        if (!Pairing.pairingProd2(vk.B, proof.B, Pairing.negate(proof.B_p), Pairing.P2())) return 2;
        if (!Pairing.pairingProd2(proof.C, vk.C, Pairing.negate(proof.C_p), Pairing.P2())) return 3;
        if (!Pairing.pairingProd3(
            proof.K, vk.gamma,
            Pairing.negate(Pairing.addition(vk_x, Pairing.addition(proof.A, proof.C))), vk.gammaBeta2,
            Pairing.negate(vk.gammaBeta1), proof.B
        )) return 4;
        if (!Pairing.pairingProd3(
                Pairing.addition(vk_x, proof.A), proof.B,
                Pairing.negate(proof.H), vk.Z,
                Pairing.negate(proof.C), Pairing.P2()
        )) return 5;
        return 0;
    }
    function verifyProof(
            uint[2] a,
            uint[2] a_p,
            uint[2][2] b,
            uint[2] b_p,
            uint[2] c,
            uint[2] c_p,
            uint[2] h,
            uint[2] k,
            uint[39] input
        ) view public returns (bool r) {
        Proof memory proof;
        proof.A = Pairing.G1Point(a[0], a[1]);
        proof.A_p = Pairing.G1Point(a_p[0], a_p[1]);
        proof.B = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.B_p = Pairing.G1Point(b_p[0], b_p[1]);
        proof.C = Pairing.G1Point(c[0], c[1]);
        proof.C_p = Pairing.G1Point(c_p[0], c_p[1]);
        proof.H = Pairing.G1Point(h[0], h[1]);
        proof.K = Pairing.G1Point(k[0], k[1]);
        uint[] memory inputValues = new uint[](input.length);
        for(uint i = 0; i < input.length; i++){
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}




