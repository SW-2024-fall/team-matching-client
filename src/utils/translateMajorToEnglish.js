import { Major } from '../pages/const/Major';

export function translateMajorToEnglish(koreanName) {
    const entries = Object.entries(Major);
    for (const [englishName, name] of entries) {
        if (name === koreanName) {
            return englishName;
        }
    }
    return null; // 이름이 없을 경우 null 반환
}
