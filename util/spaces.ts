import { S3Client } from "@aws-sdk/client-s3";
import { PassThrough } from 'node:stream';
import { Upload } from "@aws-sdk/lib-storage";

let cachedClient : S3Client;


export function uploadStream(file: any) {
    const pass = new PassThrough();
    const client = new S3Client({
        endpoint: "https://sfo3.digitaloceanspaces.com",
        region: "sfo3",
        credentials: {
            accessKeyId: "DO00Z7RZ6URYUWQXRZDA", // Access key pair. You can create access key pairs using the control panel or API.
            secretAccessKey: process.env.SPACES_SECRET || "None" // Secret access key defined through an environment variable.
          }
    });


    const params = {
        Bucket: "owo", // The path to the directory you want to upload the object to, starting with your Space name.
        Key: "profile-images/" + file.newFilename, // Object key, referenced whenever you want to access this file later.
        Body: pass, // The object's contents. This variable is an object, not a string.
        ACL: "public-read", // Defines ACL permissions, such as private or public.
        Metadata: { // Defines metadata tags.
          "content-type": "image/jpeg"
        }
      };
    
    const run = async () => {
        try {
            const parallelUploads3 = new Upload({
              client: client,
              params: params,
          
              tags: [
                /*...*/
              ], // optional tags
              queueSize: 4, // optional concurrency configuration
              partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
              leavePartsOnError: false, // optional manually handle dropped parts
            });
          
            parallelUploads3.on("httpUploadProgress", (progress) => {
              console.log(progress);
            });
          
            await parallelUploads3.done();
          } catch (e) {
            console.log(e);
          }
      };
    run();
    return pass;
}
