import { randomUUID } from 'crypto';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
  // callback: Function,
) => {
  // console.log({ file })
  // ya debería existir el file
  // if (!file) return callback(new Error('File is empty'), false);

  const fileExptension = file.mimetype.split('/')[1];

  const fileName = `${randomUUID()}.${fileExptension}`;

  callback(null, fileName);
};
