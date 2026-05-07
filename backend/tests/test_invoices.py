import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealth:
    def test_health(self):
        r = requests.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        assert r.json()["status"] == "ok"


class TestInvoices:
    def test_get_all_invoices_count(self):
        r = requests.get(f"{BASE_URL}/api/invoices")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 12

    def test_get_all_invoices_structure(self):
        r = requests.get(f"{BASE_URL}/api/invoices")
        data = r.json()
        for inv in data:
            assert "id" in inv
            assert "client" in inv
            assert "amount" in inv
            assert "status" in inv
            assert "dueDate" in inv

    def test_get_invoice_by_id(self):
        r = requests.get(f"{BASE_URL}/api/invoices/1")
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == 1
        assert data["client"] == "Acme Manufacturing"
        assert data["amount"] == 5400

    def test_invoice_statuses(self):
        r = requests.get(f"{BASE_URL}/api/invoices")
        data = r.json()
        paid = [i for i in data if i["status"] == "paid"]
        overdue = [i for i in data if i["status"] == "overdue"]
        pending = [i for i in data if i["status"] == "pending"]
        assert len(paid) == 5
        assert len(overdue) == 3
        assert len(pending) == 4

    def test_total_revenue(self):
        r = requests.get(f"{BASE_URL}/api/invoices")
        data = r.json()
        total = sum(i["amount"] for i in data)
        assert total == 101300

    def test_get_nonexistent_invoice(self):
        r = requests.get(f"{BASE_URL}/api/invoices/999")
        assert r.status_code == 200
        data = r.json()
        assert "error" in data
