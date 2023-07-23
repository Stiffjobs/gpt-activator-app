const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("copy to clipboard:", text);
  } catch (error) {
    console.error(error);
  }
};
export default copyToClipboard;
