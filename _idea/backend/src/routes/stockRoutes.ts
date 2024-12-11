import {Router} from "express";
import {getStockList, getStockDetails} from '../controllers/stockController';

const router: Router = Router();

router.get('/', getStockList);
router.get('/:ticker', getStockDetails);

export default router;
