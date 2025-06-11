#!/bin/bash

echo "🔍 Checking TypeScript types across all packages..."

# Check backend types
echo "📦 Checking Backend Types..."
cd todo-backend && npx tsc --noEmit
BACKEND_EXIT=$?

# Check frontend types  
echo "📦 Checking Frontend Types..."
cd ../todo-frontend && npx tsc --noEmit
FRONTEND_EXIT=$?

# Check shared types
echo "📦 Checking Shared Types..."
cd ../shared && npx tsc --noEmit
SHARED_EXIT=$?

cd ..

# Summary
echo ""
echo "📊 Type Check Summary:"
echo "Backend: $([ $BACKEND_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Frontend: $([ $FRONTEND_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Shared: $([ $SHARED_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"

# Exit with error if any check failed
if [ $BACKEND_EXIT -ne 0 ] || [ $FRONTEND_EXIT -ne 0 ] || [ $SHARED_EXIT -ne 0 ]; then
    echo "❌ Type checking failed!"
    exit 1
else
    echo "✅ All type checks passed!"
    exit 0
fi