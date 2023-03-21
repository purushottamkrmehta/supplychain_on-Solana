import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js"
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  NftWithToken,
} from "@metaplex-foundation/js"
import * as fs from "fs"
import qrcode from 'qrcode'
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.REACT_APP_PRIVATE_KEY!)
const keywallet = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(process.env.REACT_APP_PRIVATE_KEY ?? "") as number[]
  )
)
export interface Props {
  name: string;
  symbol: string;
  description: string;
  sellerFeeBasisPoints: number
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

const updateNftData = {
  name: "General",
  symbol: "GNRL",
  description: "Product to be added by Team",
  sellerFeeBasisPoints: 0,
  attributes: [] as any[]
}

export const productreg = async (x: Props) => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const user = keywallet;
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(user))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      }),
    );

  const uri = "https://arweave.net/wzSsNU9BGGCeqjmco8GWaLVmtqry_LCHpWkXEFbOD3Y"
  const nft = await createNft(metaplex)
  updateNftData["name"] = x.name
  updateNftData["symbol"] = x.symbol
  updateNftData['description'] = x.description
  updateNftData["attributes"] = x.attributes
  const tokenaddr = nft.address
  const updatedUri = await uploadMetadata(metaplex, updateNftData, tokenaddr)
  await updateNftUri(metaplex, updatedUri, tokenaddr)
}

async function uploadMetadata(
  metaplex: Metaplex,
  updateNftData: Props,
  tokenaddr: PublicKey
): Promise<string> {
  const qrCode = await qrcode.toDataURL(tokenaddr.toBase58())
  const data = qrCode.replace(/^data:image\/\w+;base64,/, "")
  const imagebuffer = Buffer.from(data, 'base64');
  const file = toMetaplexFile(imagebuffer, "qr_code.png");
  const imageUri = await metaplex.storage().upload(file);
  console.log("image uri:", imageUri);
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: updateNftData.name,
    symbol: updateNftData.symbol,
    description: updateNftData.description,
    image: imageUri,
    attributes: updateNftData.attributes
  });
  return uri;
}
async function createNft(
  metaplex: Metaplex,
): Promise<NftWithToken> {
  const { nft } = await metaplex.nfts().create(
    {
      uri: ' ',
      name: ' ',
      sellerFeeBasisPoints: 0,
      symbol: ' ',
    },
    { commitment: "finalized" },
  );
  console.log(
    `Token Mint: https://solscan.io/address/${nft.address.toString()}?cluster=devnet`,
  );
  return nft;
}

async function updateNftUri(
  metaplex: Metaplex,
  uri: string,
  mintAddress: PublicKey,
) {
  const nft = await metaplex.nfts().findByMint({ mintAddress });
  const { response } = await metaplex.nfts().update(
    {
      nftOrSft: nft,
      uri: uri,
    },
    { commitment: "finalized" },
  );

  console.log(
    `Transaction: https://solscan.io/tx/${response.signature}?cluster=devnet`,
  );
}


const props: Props = {
  name: "My NFT",
  symbol: "NFT",
  sellerFeeBasisPoints: 0,
  description: "My NFT Description",
  attributes: [
    { trait_type: "background", value: "grey" },
    { trait_type: "body", value: "maroon" },
    { trait_type: "outfit", value: "scarface" },
    { trait_type: "ears", value: "gold stud" },
    { trait_type: "nose", value: "nose1" },
    { trait_type: "headgear", value: "blue bandana" },
    { trait_type: "mouth", value: "smile teeth" },
    { trait_type: "eyes", value: "love" }
  ]
};

productreg(props);
