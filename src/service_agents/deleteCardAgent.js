/**
 * Agente de servicio para eliminar las fichas del usuario.
 * <pre>
 * - Busca la petición de buscar fichas en la Web y trae el resultado.
 * </pre>
 * @module agent-card-delete
 * @author Labeleon <labeleon@gmail.com>
 */

// Modulos instalados
const axios = require("axios");

// Modulos creados
const enviroment = require("../../utils/constants/enviroment");

/**
 * Respuesta al buscar fichas.
 *
 * @callback module:agent-card-search.searchCardAgentCallback
 * @param {integer} status - Codigo HTTP de respuesta.
 * @param {json[]} cards - Lista de fichas del filtro.
 * @param {json} cards.ID_CARD - Id de la ficha en la base de datos.
 * @param {string} cards.title - Título de la ficha.
 * @param {string} cards.description - Descripción de la ficha.
 * @param {json[]} cards.params - Parámetros de la ficha.
 * @param {string} cards.params.symbol - Symbolo LaTeX del parámetro.
 * @param {string} cards.params.description - Descripción del parámetro.
 * @param {json} cards.params.content - Ficha matemática del parámetro o valor nulo.
 * @param {string} cards.latexCode - Codigo LaTeX de la ficha.
 * @param {string} cards.pythonCode - Codigo Python de la ficha.
 */

/**
 * Buscar fichas.
 *
 * @param {string} ID_CARD - Id de la ficha
 * @param {module:agent-card-search.searchCardAgentCallback} callback - Respuesta al buscar fichas.
 */
function deleteUserCardAgent(ID_TOKEN, email, ID_CARD, callback) {
  axios
    .delete(enviroment.serverUrl + "/card/destroy", {
      params: {
        ID_TOKEN: ID_TOKEN,
        email: email,
        ID_CARD: ID_CARD
      }
    })
    .then(function(response) {
      callback(response.status, response.data);
    })
    .catch(function(error) {
      if (error.response) {
        callback(error.response.status, error.response.data);
      } else {
        callback(500, "Lo sentimos, no fue posible conectarse al servidor.");
      }
    });
}

// Exportar agente de servicio
export default deleteUserCardAgent;
