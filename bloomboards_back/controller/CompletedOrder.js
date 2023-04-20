const express = require('express')
const completedOrderRouter = express.Router()


////////////////////
//DATA
////////////////////
const completedOrder = require("../models/completedOrder")

////////////////////
//INDEX
completedOrderRouter.get("/", async (req, res) => {
  try {
    const foundcompletedOrder = await completedOrder.find({})
    res.status(200).json(foundcompletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

////////////////////
//NEW
completedOrderRouter.get("/new", async (req, res) => {
});

////////////////////
//DESTORY
completedOrderRouter.delete("/:id", async (req, res) => {
  try {
    const deletedCompletedOrder = await completedOrder.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedCompletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
});

////////////////////
//UPDATE
completedOrderRouter.put("/:id", async (req, res) => {
try {
  const updatedcompletedOrder = await completedOrder.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedcompletedOrder)
} catch (error) {
  res.status(500).json(error)
}
});

////////////////////
//CREATE
completedOrderRouter.post("/", async (req, res) => {
  try {
    const createdcompletedOrder = await completedOrder.create(req.body);
    res.status(200).json(createdcompletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
});

////////////////////
//EDIT
completedOrderRouter.get("/:id/edit", async (req, res) => {
  try {
    const foundcompletedOrder = await completedOrder.findById(req.params.id)
    res.status(200).json(foundcompletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
 
    });

////////////////////
//SHOW
completedOrderRouter.get("/:uid", async (req, res) => {
  try {
    const foundcompletedOrder = await completedOrder.find({id: req.params.uid})
    res.status(200).json(foundcompletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

completedOrderRouter.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await completedOrder.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = completedOrderRouter;