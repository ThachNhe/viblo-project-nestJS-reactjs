import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

// @Injectable()
// export class FileUploadService {
//    constructor(
//       private minioClientService: MinioClientService
//    ) { }

//    async uploadSingle(image: BufferedFile) {

//       let uploaded_image = await this.minioClientService.upload(image)

//       return {
//          image_url: uploaded_image.url,
//          message: "Successfully uploaded to MinIO S3"
//       }
//    }

//    async uploadMany(files: BufferedFile) {

//       let image1 = files['image1'][0]
//       let uploaded_image1 = await this.minioClientService.upload(image1)

//       let image2 = files['image2'][0]
//       let uploaded_image2 = await this.minioClientService.upload(image2)

//       return {
//          image1_url: uploaded_image1.url,
//          image2_url: uploaded_image2.url,
//          message: 'Successfully uploaded mutiple image on MinioS3'
//       }
//    }
// }


const Minio = require('minio')
const client = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
})

@Injectable()
export class FileUploadService {
  async presignedUrl(name: string) {
    console.log("check name : ", name)
  }
}
//   server.get('/presignedUrl', (req, res) => {
//   client.presignedPutObject('uploads', req.query.name, (err, url) => {
//     if (err) throw err
//     res.end(url)
//   })
// })