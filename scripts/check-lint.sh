#!/bin/bash

echo "🧹 Running linting checks across all packages..."

# Check backend linting
echo "📦 Checking Backend Linting..."
cd todo-backend && npm run lint
BACKEND_EXIT=$?

# Check frontend linting
echo "📦 Checking Frontend Linting..."
cd ../todo-frontend && npm run lint
FRONTEND_EXIT=$?

cd ..

# Summary
echo ""
echo "📊 Lint Check Summary:"
echo "Backend: $([ $BACKEND_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Frontend: $([ $FRONTEND_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"

# Exit with error if any check failed
if [ $BACKEND_EXIT -ne 0 ] || [ $FRONTEND_EXIT -ne 0 ]; then
    echo "❌ Linting failed!"
    exit 1
else
    echo "✅ All lint checks passed!"
    exit 0
fi