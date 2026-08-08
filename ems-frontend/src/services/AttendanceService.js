import axios from 'axios';

const ATTENDANCE_REST_API_BASE_URL = 'http://localhost:8080/api/attendances';

export const getAllAttendances = () => axios.get(ATTENDANCE_REST_API_BASE_URL);
