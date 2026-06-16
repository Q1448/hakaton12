import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ResumeSchema = z.object({
  name: z.string().optional().default(""),
  grade: z.number().optional().default(11),
  achievements: z.string().min(1),
  activities: z.string().min(1),
  direction: z.string().min(1),
  university: z.string().min(1),
  whyUniversity: z.string().min(1),
  lang: z.enum(["RU", "KZ", "EN"]).default("RU"),
});

export type ResumeInput = z.infer<typeof ResumeSchema>;

export type ResumeScore = {
  score: number;
  level: string;
  summary: string;
  strengths: string[];
  improvements: string[];
  breakdown: { name: string; score: number; comment: string }[];
};

export const scoreResume = createServerFn({ method: "POST" })
  .inputValidator((d) => ResumeSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const langLabel = data.lang === "KZ" ? "Kazakh (Қазақша)" : data.lang === "EN" ? "English" : "Russian (Русский)";

    const systemPrompt = `You are an experienced admissions officer and senior university mentor for top international and Kazakhstani universities (Harvard, MIT, Stanford, NU, KIMEP, AUCA). Evaluate a high-school student's resume objectively and rigorously. Reply ONLY with valid JSON matching the schema. Be honest — if the application is weak, score low (30-50). Average — 60-75. Strong — 80-90. Exceptional (international olympiad medalist, published research, etc.) — 90-100. Write all human text in ${langLabel}.`;

    const userPrompt = `Student profile:
- Name: ${data.name || "(not provided)"}
- Grade: ${data.grade}
- Target direction: ${data.direction}
- Target university: ${data.university}

ACHIEVEMENTS / AWARDS:
${data.achievements}

EXTRACURRICULAR ACTIVITIES:
${data.activities}

WHY THIS UNIVERSITY (motivation essay):
${data.whyUniversity}

Evaluate. Output JSON with fields:
{
  "score": number 0..100,
  "level": short label (e.g. "Strong candidate" / "Сильный кандидат"),
  "summary": 2-3 sentence overall verdict,
  "strengths": array of 3-5 short bullet strings,
  "improvements": array of 3-5 actionable recommendations,
  "breakdown": array of objects {name, score 0..100, comment} for these criteria: "Academic achievements", "Extracurricular impact", "Fit with university", "Motivation essay quality", "Overall profile coherence"
}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`AI gateway error ${res.status}: ${txt.slice(0, 200)}`);
    }
    const json = await res.json();
    const content: string = json?.choices?.[0]?.message?.content ?? "{}";
    let parsed: ResumeScore;
    try {
      parsed = JSON.parse(content);
    } catch {
      const m = content.match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : ({ score: 0, level: "—", summary: content, strengths: [], improvements: [], breakdown: [] } as ResumeScore);
    }
    parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score ?? 0)));
    return parsed;
  });
