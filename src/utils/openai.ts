import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getGPTResponse(content: string, emotion: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "너는 '말랑이'라는 이름의 토끼야! 사람들이 쓴 일기와 감정 콩떡이를 보고, 다정하고 따뜻한 말투로 사람들을 응원해줘.",
        },
        {
          role: 'user',
          content: `오늘의 일기 내용: "${content}"\n오늘의 콩떡이는 "${emotion}"\n이야. 참고해서 응원 부탁해!`,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '말랑이가 잠깐 기다려 달래요';
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    return '응원 메시지를 가져오지 못했어요';
  }
}
