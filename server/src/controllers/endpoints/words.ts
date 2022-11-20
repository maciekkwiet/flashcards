import { getAllWords } from '@services/wordsDictionary';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request<any, any, any, any>, res: Response) => {
  try {
    const result = await getAllWords()
    res.json({result})
  } catch (ex) {
    console.error(ex);
  }
});

export { router as wordsController };
