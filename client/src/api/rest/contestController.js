import http from '../interceptor';

export const updateContest = (data) => http.put(`/contests/${data.contestId}`, data);
export const downloadContestFile = (data) => http.get(`/contests/downloadFile/${data.fileName}`);
export const dataForContest = (data) => http.post('/contests/dataForContest', data);

export const getCustomersContests = ({ 
  offset, 
  limit, 
  contestStatus 
}) =>
  http.get(`/contests/customersContests?limit=${limit}&offset=${offset}`, {
    headers: {
      status: contestStatus,
    },
  });

export const getActiveContests = ({ offset, limit, typeIndex, contestId, industry, awardSort, ownEntries }) =>
  http.get(`/contests?offset=${offset}&limit=${limit}&typeIndex=${typeIndex}&contestId=${contestId}
              &industry=${industry}&awardSort=${awardSort}&ownEntries=${ownEntries}`
  );

export const getContestById = ({ contestId }) =>
  http.get(`/contests/:${contestId}`, {
    headers: { contestId: contestId },
  });


