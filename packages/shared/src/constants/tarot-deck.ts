import { TarotCard } from "../types/tarot";

export const TAROT_MAJOR_ARCANA: TarotCard[] = [
  { number: 0, name: "O Louco", arcana: "major", keywords: ["liberdade", "recomeço", "salto de fé"], image: "o-louco.jpg" },
  { number: 1, name: "O Mago", arcana: "major", keywords: ["poder pessoal", "manifestação", "ação"], image: "o-mago.jpg" },
  { number: 2, name: "A Sacerdotisa", arcana: "major", keywords: ["intuição", "mistério", "sabedoria interior"], image: "a-sacerdotisa.jpg" },
  { number: 3, name: "A Imperatriz", arcana: "major", keywords: ["abundância", "fertilidade", "cuidado"], image: "a-imperatriz.jpg" },
  { number: 4, name: "O Imperador", arcana: "major", keywords: ["estrutura", "autoridade", "estabilidade"], image: "o-imperador.jpg" },
  { number: 5, name: "O Hierofante", arcana: "major", keywords: ["tradição", "orientação", "aprendizado"], image: "o-hierofante.jpg" },
  { number: 6, name: "Os Enamorados", arcana: "major", keywords: ["escolha", "amor", "alinhamento"], image: "os-enamorados.jpg" },
  { number: 7, name: "O Carro", arcana: "major", keywords: ["determinação", "vitória", "controle"], image: "o-carro.jpg" },
  { number: 8, name: "A Força", arcana: "major", keywords: ["coragem", "paciência", "força interior"], image: "a-forca.jpg" },
  { number: 9, name: "O Eremita", arcana: "major", keywords: ["introspecção", "solidão", "busca interior"], image: "o-eremita.jpg" },
  { number: 10, name: "A Roda da Fortuna", arcana: "major", keywords: ["ciclos", "mudança", "destino"], image: "a-roda-da-fortuna.jpg" },
  { number: 11, name: "A Justiça", arcana: "major", keywords: ["equilíbrio", "verdade", "consequências"], image: "a-justica.jpg" },
  { number: 12, name: "O Enforcado", arcana: "major", keywords: ["pausa", "perspectiva", "entrega"], image: "o-enforcado.jpg" },
  { number: 13, name: "A Morte", arcana: "major", keywords: ["transformação", "fim de ciclo", "renascimento"], image: "a-morte.jpg" },
  { number: 14, name: "A Temperança", arcana: "major", keywords: ["equilíbrio", "paciência", "moderação"], image: "a-temperanca.jpg" },
  { number: 15, name: "O Diabo", arcana: "major", keywords: ["apego", "vícios", "ilusão"], image: "o-diabo.jpg" },
  { number: 16, name: "A Torre", arcana: "major", keywords: ["ruptura", "revelação", "libertação"], image: "a-torre.jpg" },
  { number: 17, name: "A Estrela", arcana: "major", keywords: ["esperança", "inspiração", "cura"], image: "a-estrela.jpg" },
  { number: 18, name: "A Lua", arcana: "major", keywords: ["ilusão", "medo", "inconsciente"], image: "a-lua.jpg" },
  { number: 19, name: "O Sol", arcana: "major", keywords: ["alegria", "sucesso", "vitalidade"], image: "o-sol.jpg" },
  { number: 20, name: "O Julgamento", arcana: "major", keywords: ["despertar", "avaliação", "chamado"], image: "o-julgamento.jpg" },
  { number: 21, name: "O Mundo", arcana: "major", keywords: ["realização", "completude", "integração"], image: "o-mundo.jpg" },
];

const SUITS = [
  { name: "Copas", keywords: ["emoções", "amor", "relacionamentos"] },
  { name: "Espadas", keywords: ["mente", "verdade", "conflito"] },
  { name: "Paus", keywords: ["energia", "ação", "criatividade"] },
  { name: "Ouros", keywords: ["material", "trabalho", "estabilidade"] },
];

const COURT = ["Ás", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Valete", "Cavaleiro", "Rainha", "Rei"];

function generateMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  let number = 22;
  for (const suit of SUITS) {
    for (const rank of COURT) {
      cards.push({
        number: number++,
        name: `${rank} de ${suit.name}`,
        arcana: "minor",
        suit: suit.name,
        keywords: suit.keywords,
        image: `${rank.toLowerCase()}-de-${suit.name.toLowerCase()}.jpg`,
      });
    }
  }
  return cards;
}

export const TAROT_MINOR_ARCANA = generateMinorArcana();
export const TAROT_DECK: TarotCard[] = [...TAROT_MAJOR_ARCANA, ...TAROT_MINOR_ARCANA];

export function drawRandomCard(): TarotCard {
  return TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
}
