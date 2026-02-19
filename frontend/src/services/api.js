const BASE_URL = "http://localhost:5000";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const api = {
  getExperts: () => request("/experts"),
  getExpertById: (id) => request(`/experts/${id}`),

  createBooking: (data) =>
    request("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getBookingsByEmail: (email) =>
    request(`/bookings?email=${email}`),

  updateBookingStatus: (id, status) =>
    request(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
