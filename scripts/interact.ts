import  { network } from "hardhat";

const { ethers } = await network.connect({
  network: "sepolia",
});
async function main() {
  const contractAddress = "0xD8f580Ee9915028Ad6F6eb5E767325449a3f5D17";

  const SimpleNotes = await ethers.getContractFactory("SimpleNotes");
  const simpleNotes = SimpleNotes.attach(contractAddress);

  const tx = await simpleNotes.addNote("Test note đầu tiên từ script!");
  await tx.wait();
  console.log("Note added! Tx hash:", tx.hash);

  const count = await simpleNotes.getNoteCount();
  console.log("Tổng số notes:", count.toString());

  const [owner, content] = await simpleNotes.getNote(0);
  console.log("Note 0 - Owner:", owner, "Content:", content);

  const myNotes = await simpleNotes.getMyNotes();
  console.log("My notes:", myNotes.map((note: any) => ({ owner: note.owner, content: note.content })));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});