const mysql = require("../db/mysql").pool;
const express = require("express");
const router = express.Router();

//cria o metodo GET
router.get("/", (request, response) => {
  try {
    //pega a conexao aberta, atraves do pool (/db/mysql)
    mysql.getConnection((error, conn) => {
      if (error) throw error;
      //utiliza a conexao aberta, executa a query e da um retorno (arrow function)
      conn.query("SELECT * FROM tbl_autores", (error, result) => {
        conn.release(); //libera a conexao
        if (error) throw error;
        //trata o retorno do GET
        const resposta = {
          quantidade: result.length,

          autores: result.map((autor) => {
            return {
              ID: autor.ID_Autor,
              Nome: autor.Nome_Autor,
              Sobrenome: autor.Sobrenome_Autor,
              request: {
                tipo: "GET",
                descricao: "Saiba mais sobre o autor",
                url: "http://localhost:3001/autores/" + autor.ID_Autor,
              },
            };
          }),
        };

        return response.status(200).send(resposta);
      });
    });
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

//cria o metodo GET, e atraves do parametro retorna apenas um registro
router.get("/:id_autor", (request, response) => {
  try {
    //pega a conexao aberta, atraves do pool (/db/mysql)
    mysql.getConnection((error, conn) => {
      if (error) throw error;
      //utiliza a conexao aberta, executa a query e da um retorno (arrow function)
      conn.query(
        "SELECT * FROM tbl_autores where ID_Autor = ?",
        //passa o parametro para  a query, sendo o ? o primeiro item do array
        [request.params.id_autor], //array com o dado do parametro
        (error, result) => {
          conn.release(); //libera a conexao
          if (error) {
            return response.status(500).send({ erro: error });
          }
          if (result.length === 0) {
            return response.status(404).send({
              mensagem: "Nenhum autor encontrado. Verifique o ID informado",
            });
          }
          //trata o retorno do GET

          const resposta = {
            Autor: {
              ID: result[0].ID_Autor,
              Nome: result[0].Nome_Autor,
              Sobrenome: result[0].Sobrenome_Autor,

              request: {
                tipo: "GET",
                descricao: "Veja outros autores",
                url: "http://localhost:3001/autores/",
              },
            },
          };
          return response.status(200).send(resposta);
        }
      );
    });
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});
//cria o metodo de inclusao
router.post("/", (request, response) => {
  try {
    //pega a conexao aberta, atraves do pool (/db/mysql)
    mysql.getConnection((error, conn) => {
      if (error) throw error;
      //utiliza a conexao aberta, executa a query e da um retorno (arrow function)
      conn.query(
        `INSERT INTO tbl_autores
                      (Nome_Autor, Sobrenome_Autor) values (?,?)`,
        [request.body.Nome_Autor, request.body.Sobrenome_Autor],
        (erro, result) => {
          conn.release(); //libera a conexao
          if (error) {
            return response.status(500).send({ error: error });
          }

          const resposta = {
            mensagem: "Autor inserido com sucesso!",
            AutorCriado: {
              ID_Autor: result.ID_Autor,
              Nome_Autor: request.body.Nome_Autor,
              Sobrenome_Autor: request.body.Sobrenome_Autor,
            },
            request: {
              tipo: "GET",
              descricao: "Verifique outros autores",
              url: "http://localhost:3001/autores",
            },
          };

          return response.status(201).send(resposta);
        }
      );
    });
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

router.patch("/", (request, response) => {
  try {
    mysql.getConnection((error, conn) => {
      if (error) throw error;
      conn.query(
        `UPDATE tbl_autores
          set Nome_autor = ?, Sobrenome_Autor = ?
          where ID_Autor = ?`,
        [
          request.body.Nome_Autor,
          request.body.Sobrenome_Autor,
          request.body.ID_Autor,
        ],
        (error, result) => {
          conn.release();
          if (error) {
            return response.status(500).send({ error: erro });
          }

          if (result.affectedRows === 0) {
            return response.status(404).send({
              mensagem: "Nenhum autor encontrado. Verifique o ID informado",
            });
          }

          const resposta = {
            Autor_alterado: {
              ID: request.body.ID_Autor,
              Nome: request.body.Nome_Autor,
              Sobrenome: request.body.Sobrenome_Autor,
              request: {
                tipo: "GET",
                descricao: "Verfique mais detalhes sobre o autor",
                url: "http://localhost:3001/autores/" + request.body.ID_Autor,
              },
            },
          };
          return response.status(202).send(resposta);
        }
      );
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.delete("/", (request, response) => {
  mysql.getConnection((error, conn) => {
    if (error) throw error;
    conn.query(
      `DELETE FROM tbl_autores where ID_Autor = ?`,
      [request.body.ID_Autor],
      (error, result) => {
        conn.release();
        if (error) {
          return response.status(500).send({ error: error });
        }
        if (result.affectedRows === 0) {
          return response.status(404).send({
            mensagem: "Nenhum autor excluido. Verifique o ID informado",
          });
        }

        const resultado = {
          mensagem: "Autor excluido com sucesso",
          response: {
            tipo: "POST",
            descricao: "Inseri um autor",
            url: "http://localhost:3001/autores",
            body: {
              Nome_Autor: "String",
              Sobrenome_Autor: "String",
            },
          },
        };
        return response.status(201).send(resultado);
      }
    );
  });
});

module.exports = router;
