"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuiz = exports.getUserQuiz = exports.getQuizzes = void 0;
const quiz_1 = require("../../models/quiz");
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield quiz_1.Quiz.find();
        res.status(200).json({ quizzes });
    }
    catch (error) {
        throw error;
    }
});
exports.getQuizzes = getQuizzes;
const getUserQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, type } = req.params;
        const quiz = yield quiz_1.Quiz.findOne({ user: id, type: type });
        res.status(200).json(quiz);
    }
    catch (error) {
        throw error;
    }
});
exports.getUserQuiz = getUserQuiz;
const addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log('body: ', body);
        const existingQuiz = (yield quiz_1.Quiz.findOne({
            user: body.user,
            type: body.type,
        }));
        console.log('existingQuiz: ', existingQuiz);
        if (!existingQuiz) {
            const quiz = new quiz_1.Quiz({
                highscore: body.highscore,
                type: body.type,
                user: body.user,
            });
            const newQuiz = yield quiz.save();
            console.log('newQuiz: ', newQuiz);
            res.status(201).json({ message: 'Quiz added', quiz: newQuiz });
        }
        else if (!body.type || !body.user) {
            res.status(400).json({ message: 'type and user fields are required' });
        }
        else {
            existingQuiz.highscore = body.highscore;
            existingQuiz.type = body.type;
            existingQuiz.user = body.user;
            try {
                const updatedQuiz = yield existingQuiz.save();
                console.log('updatedQuiz: ', updatedQuiz);
                res.status(200).json({ message: 'Quiz updated', quiz: updatedQuiz });
            }
            catch (validationError) {
                console.error(validationError);
                res.status(400).json({ message: 'Quiz not updated', error: validationError });
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addQuiz = addQuiz;
