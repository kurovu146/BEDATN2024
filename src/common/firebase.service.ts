import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private storageBucket;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const serviceAccount = JSON.parse(
      this.configService.get<string>('FIREBASE_CONFIG') || '{}',
    );

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
      });
    }

    this.storageBucket = admin.storage().bucket();
  }

  getStorageBucket() {
    return this.storageBucket;
  }
}
