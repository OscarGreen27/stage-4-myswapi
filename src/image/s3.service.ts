import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//service for working with AWS S3
@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get('S3_REGION', '123'),
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY', 'access_key'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY', 'seccret_access_key'),
      },
    });
  }
  /**
   * function loads the image to the S3 bucket
   * @param file image from user
   * @param folder the folder where the image will be stored. The folder name must match the table name
   * @param id entity ID. Required to create a folder for each unique entity
   * @returns image link
   */
  async uploadImage(id: number, folder: string, file: Express.Multer.File) {
    const bucket = this.configService.get<string>('S3_BUCKET_NAME', 'bucket_name');
    const key = `${folder}/${id}/${Date.now()}_${Math.floor(Math.random() * 1e6)}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3.send(command);
    } catch (err) {
      console.error('Error massage:', err);
    }

    return { url: `https://${bucket}.s3.${this.configService.get('S3_REGION')}.amazonaws.com/${key}`, key: key };
  }

  /**
   * function deletes images from S3 bucket
   * @param key key by which the image will be found
   * @returns true if the deletion is successful, false if not
   */
  async deleteImage(key: string) {
    //const bucket = this.configService.get<string>('S3_BUCKET_NAME', 'bucket_name');

    const command = new DeleteObjectCommand({
      Bucket: this.configService.get<string>('S3_BUCKET_NAME', 'bucket_name'),
      Key: key,
    });

    try {
      await this.s3.send(command);
    } catch (err) {
      console.error('Error massage:', err);
    }
    return true;
  }
}
