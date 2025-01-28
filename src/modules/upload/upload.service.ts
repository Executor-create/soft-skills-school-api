import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly AWS_S3_BUCKET_NAME = 'soft-skills-school-bucket';
  private readonly s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  async uploadImage(image: Express.Multer.File): Promise<string> {
    const { originalname, buffer, mimetype } = image;

    const fileName = `${Date.now()}-${originalname}`;

    const s3Response = await this.s3_upload(
      buffer,
      this.AWS_S3_BUCKET_NAME,
      fileName,
      mimetype,
    );

    return s3Response.Location;
  }

  private async s3_upload(
    fileBuffer: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: name,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
