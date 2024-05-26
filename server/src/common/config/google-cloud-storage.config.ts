import { registerAs } from '@nestjs/config';

export const googleCloudStorage = registerAs('google-cloud-storage', () => ({
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    media_bucket: process.env.GOOGLE_MEDIA_BUCKET,
}));
