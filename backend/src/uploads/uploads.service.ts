import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Multer } from 'multer';

@Injectable()
export class UploadsService {
  private s3: S3Client;
  constructor(
    private readonly configService: ConfigService
  ){
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
      },
      region: this.configService.get<string>('AWS_REGION')
    });
  }

  async uploadfile(file: Multer.File): Promise<string> {
    const originalname = file.originalname.split('.');
    const date = Date.now().toString()
    const filename = `${date}.${originalname[originalname.length - 1]}`;
    
    const result:PutObjectCommandInput = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      Body: file.buffer,
      Key: filename,
      ContentType: file.mimetype,
    }

    const command = new PutObjectCommand(result);
    await this.s3.send(command);
    const response = `https://desafio-frontend-28-2024.s3.amazonaws.com/${filename}`

    return response;
  }
}
