// @ts-nocheck
/**
 * Arquivo: DeleteFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável excluir um 'Funcionário' pelo Id
 *
 * Digitar o snippet: mongo-serverless-delete
 */

const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongo");

module.exports = async function(context, req) {
    const { id } = req.params;

    if (!id) {
        context.res = {
            status: 400,
            body: "Os campos são obrigatórios!"
        };

        return;
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Funcionarios = MongoClient.collection('funcionarios');

    try {
        await Funcionarios.findOneAndDelete({ _id: ObjectID(id) });
        closeConnectionFn();
        context.res = {
            status: 200,
            body: "Funcionário excluído com sucesso!"
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Erro ao excluir Funcionário" + id
        };
    }
};

