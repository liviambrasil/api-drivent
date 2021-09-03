import joi from "joi";

export default joi.object({
  userId: joi.number().positive().integer(),
  isPresential: joi.boolean(),
  isHotel: joi.boolean(),
  isPaid: joi.boolean()
});
