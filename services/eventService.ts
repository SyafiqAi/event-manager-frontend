export const fetchEvents = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('No token found');

  console.log({token})
  const res = await fetch('http://localhost:9000/events', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch events');
  }

  const js=   await res.json();
  console.log({js})
  return js
};
