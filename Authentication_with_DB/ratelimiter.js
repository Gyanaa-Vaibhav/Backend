import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 10*60*1000,
    max:100,
    message : 'Too many requests try again after 15 min'
})

export default limiter;