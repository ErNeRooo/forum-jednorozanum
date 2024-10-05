const GetFileNameFromFirebaseStorageUrl = (url: string): string => {
  const urlParts = url.split("?")[0];

  const pathParts = urlParts.split("/");

  const encodedFileName = pathParts.pop();
  if (encodedFileName === undefined) return "wrong url";

  const fileName: string = decodeURIComponent(
    encodedFileName.split("%2F").pop() as string
  );

  return fileName;
};

export default GetFileNameFromFirebaseStorageUrl;
