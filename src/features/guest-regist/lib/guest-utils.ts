// 방문한 이벤트들을 관리하는 유틸리티 함수들
const VISITED_EVENTS_KEY = "visited-events";

const getVisitedEvents = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const visited = localStorage.getItem(VISITED_EVENTS_KEY);
    return visited ? JSON.parse(visited) : [];
  } catch {
    return [];
  }
};

const addVisitedEvent = (eventIdx: number) => {
  if (typeof window === "undefined") return;

  try {
    const visited = getVisitedEvents();
    const eventId = eventIdx.toString();

    if (!visited.includes(eventId)) {
      visited.push(eventId);
      localStorage.setItem(VISITED_EVENTS_KEY, JSON.stringify(visited));
    }
  } catch (error) {
    console.error("Failed to save visited event:", error);
  }
};

const isFirstVisit = (eventIdx: number): boolean => {
  const visited = getVisitedEvents();
  return !visited.includes(eventIdx.toString());
};

const getDeviceId = (): string => {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const screenResolution = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);

  const deviceId = `${userAgent}-${language}-${platform}-${screenResolution}-${timezone}-${timestamp}-${random}`;
  return deviceId;
};

export { addVisitedEvent, isFirstVisit, getDeviceId };
