import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  constructor(private http: HttpClient) {}

  getAiRecommendation(weather: any, isMetric: boolean): Observable<string> {
    const temp = isMetric
      ? `${weather.Temperature.Metric.Value}°C`
      : `${weather.Temperature.Imperial.Value}°F`;

    const prompt = `
      Recommend clothing for today based on the following weather:

      - Temperature: ${temp}
      - Sky condition: ${weather.WeatherText} 
      Keep it short and to the point.
    `.trim();

    return this.http.post<any>('https://api.groq.com/openai/v1/chat/completions', {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.aiKey}`,
      }
    }).pipe(
      map(res => res.choices?.[0]?.message?.content?.trim() || 'No recommendation received.')
    );
  }
}
