import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// POST endpoint for Islamic Marital Advice / Counselling
app.post('/api/gemini/advisor', async (req: Request, res: Response) => {
  const { question, topic, coupleStatus } = req.body;

  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'Question requise.' });
    return;
  }

  // If Gemini API is available, use gemini-3.8-flash
  if (ai) {
    try {
      const systemInstruction = `Tu es un conseiller conjugal islamique sage, bienveillant et versé dans le fiqh du mariage selon le Saint Coran et la Sunnah authentique, avec une parfaite compréhension des réalités culturelles et sociales de la République du Niger (coutumes hausa, zarma-songhai, peul/fulfulde, touareg, kanuri, rôle des familles, respect des beaux-parents, questions du Sadaki/Mahr, conciliation selon Sourate An-Nisa verset 35).
Tes réponses doivent être structurées, douces, réconfortantes, basées sur des versets ou hadiths avec leur enseignement pratique, et offrir des étapes concrètes adaptées aux époux ou fiancés vivant au Niger.
Évite tout langage sec ou réprobateur. Sois toujours constructif et axé sur l'amour (Mawadda), la miséricorde (Rahmah) et la paix dans le foyer (Sakinah).
Réponds en français avec les termes islamiques usuels expliqués simplement.`;

      const prompt = `Contexte: Sujet: ${topic || 'Vie de couple & Mariage'}, Statut du membre: ${coupleStatus || 'En recherche de mariage / Marié(e)'}.
Question / Préoccupation du membre au Niger: "${question}"

Donne un conseil spirituel, pratique et relationnel selon l'Islam adapté au Niger.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        advice: response.text,
        source: 'gemini',
      });
      return;
    } catch (err) {
      console.error('Error invoking Gemini:', err);
      // Fallback to grounded knowledge
    }
  }

  // High quality grounded knowledge fallback
  const fallbackAdvice = generateFallbackAdvice(question, topic);
  res.json({
    advice: fallbackAdvice,
    source: 'local_knowledge',
  });
});

function generateFallbackAdvice(question: string, topic?: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('dot') || q.includes('sadaki') || q.includes('argent') || q.includes('mahr')) {
    return `### 🌸 Le Mahr (Sadaki) dans la Sunnah et au Niger

Allah le Très-Haut dit : *« Et donnez aux épouses leur mahr de bonne grâce. »* (Sourate An-Nisa, v. 4).

1. **La simplicité est une bénédiction :** Le Prophète ﷺ a enseigné : *« Le mariage qui a le plus de bénédiction (barakah) est celui dont les dépenses sont les plus modérées. »* (Ahmad).
2. **Conseil pour les familles au Niger :** Ne laissez pas les exigences matérielles élevées retarder l'union de deux cœurs pieux. Le Sadaki est un honneur pour la femme et sa propriété exclusive, non un prix d'achat. Discutez ouvertement et avec respect entre les représentants des familles (Wali) pour fixer un montant accessible qui préserve la dignité sans endetter le futur époux.
3. **Prière de consultation (Istikhara) :** Faites précéder toute décision d'une sincère prière pour que la paix accompagne ce foyer naissant.`;
  }

  if (q.includes('dispute') || q.includes('colère') || q.includes('conflit') || q.includes('désaccord')) {
    return `### 🕊️ L'apaisement des cœurs dans le couple musulman

Allah dit : *« Comportez-vous envers elles avec bienséance et bonté »* (Sourate An-Nisa, v. 19).

1. **La règle du silence face à la colère :** Le Messager d'Allah ﷺ a dit : *« Le fort n'est pas celui qui terrasse ses adversaires, mais celui qui maîtrise sa colère. »* (Al-Bukhari). Ne répondez jamais à chaud ; laissez passer la tempête avant d'échanger.
2. **Le respect avant d'avoir raison :** L'objectif du mariage n'est pas de remporter une dispute, mais de préserver la sakinah (quiétude). Écoutez le ressenti de votre conjoint sans interruption.
3. **La médiation familiale sahélienne :** Si le désaccord persiste, la méthode coranique préconise de faire appel à un sage de chaque famille (Sourate An-Nisa, v. 35) pour réconcilier avec justice et bienveillance, sans étaler ses secrets au grand jour.`;
  }

  if (q.includes('belle-famille') || q.includes('beaux-parents') || q.includes('parents') || q.includes('maman')) {
    return `### 🌿 L'harmonie avec la belle-famille au Niger

Dans nos sociétés nigériennes, le mariage unit deux grandes familles. L'Islam nous ordonne le plus grand respect envers les aînés.

1. **L'adab envers les beaux-parents :** Traitez vos beaux-parents avec l'honneur (Ikrâm) dû aux aînés. Un mot doux, un cadeau modeste ou une visite respectueuse ouvre les cœurs les plus exigeants.
2. **La préservation de l'intimité du couple :** Tout en honorant la famille, le couple doit disposer de son espace intime de décision. L'époux doit être un bouclier bienveillant sans jamais manquer de piété filiale envers sa mère et son père.
3. **La patience (Sabr) :** Les incompréhensions des premiers mois se dissipent par la patience et la constance dans le bon comportement.`;
  }

  return `### 💎 Les Fondations de l'Amour et de la Miséricorde (Mawadda wa Rahmah)

Le Coran nous rappelle : *« Et parmi Ses signes Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles et Il a mis entre vous de l'affection et de la miséricorde. »* (Sourate Ar-Rum, v. 21).

1. **La bienveillance quotidienne :** Le Prophète ﷺ a dit : *« Le meilleur d'entre vous est le meilleur envers sa famille, et je suis le meilleur d'entre vous envers ma famille. »* (At-Tirmidhi).
2. **La communication claire et sincère :** Prenez le temps chaque jour d'échanger sur vos projets, vos joies et vos épreuves sans rancœur ni jugement hâtif.
3. **L'entraide spirituelle :** Priez ensemble, rappelez-vous mutuellement les enseignements divins et faites de votre foyer un refuge de paix face aux défis du quotidien.`;
}

// Development and production static serving
async function startServer() {
  const fs = await import('fs');

  // Serve static assets for both development and production
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
  app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      configFile: path.resolve(__dirname, 'vite.config.ts'),
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl || req.url;
      if (url.startsWith('/api')) {
        return next();
      }

      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' });
        if (req.method === 'HEAD') {
          return res.end();
        }
        return res.end(template);
      } catch (e) {
        return next(e);
      }
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use('*', (req, res) => {
      if (req.method === 'HEAD') {
        return res.status(200).set({ 'Content-Type': 'text/html' }).end();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mawadda Niger server running on http://0.0.0.0:${PORT}`);
  });
}


startServer();
