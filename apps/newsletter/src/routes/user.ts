import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('GET: users');
});
//   .post((req, res) => {
//     res.send('Add a book')
//   })
//   .put((req, res) => {
//     res.send('Update the book')
//   })

export default router;
