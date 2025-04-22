import express from "express";

import userController from "../controllers/user.controller.js";

const { getUser, getUsers, createUser, updateUser, deleteUser } = userController;

const router= express.Router();


router.get('/:id',getUser);

router.get('/', getUsers);

router.post('/',createUser);
   
router.put('/:id',updateUser);


router.delete('/:id', deleteUser);


export default router;

