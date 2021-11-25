import { API_SERVER } from './index';
import authHeader from './authHeader';

async function getAllTransaction() {
  const res = await fetch(`${API_SERVER}/admin/transaction`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function getByIdTransaction(id) {
  const res = await fetch(`${API_SERVER}/admin/transaction/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

async function createTransaction() {
  const res = await fetch(`${API_SERVER}/admin/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id,
      payment_id: data.payment_id
    })
  });
  return res.json();
}

async function updateTransaction(data) {
  const res = await fetch(`${API_SERVER}/admin/transaction/` + data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      user_id: data.user_id,
      course_id: data.course_id,
      payment_id: data.payment_id
    })
  });
  return res.json();
}

async function destroyTransaction(id) {
  const res = await fetch(`${API_SERVER}/admin/transaction/destroy/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  return res.json();
}

export {
  getAllTransaction,
  getByIdTransaction,
  createTransaction,
  updateTransaction,
  destroyTransaction
};
