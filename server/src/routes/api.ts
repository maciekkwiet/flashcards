import { Router } from 'express';
import { wordsController } from '@controllers/endpoints/words';

const router = Router();

router.use('/words', wordsController);

export { router as apiController };
