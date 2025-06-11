#!/bin/bash

echo "🚀 Running comprehensive error checks..."
echo "================================================"

# 1. Type checking
echo "1️⃣ TypeScript Type Checking"
./scripts/check-types.sh
TYPE_EXIT=$?

echo ""
echo "================================================"

# 2. Linting
echo "2️⃣ ESLint Code Quality"
./scripts/check-lint.sh
LINT_EXIT=$?

echo ""
echo "================================================"

# 3. Test execution
echo "3️⃣ Test Suite Execution"
npm test
TEST_EXIT=$?

echo ""
echo "================================================"

# 4. Build verification
echo "4️⃣ Build Verification"
echo "📦 Building Backend..."
cd todo-backend && npm run build
BACKEND_BUILD_EXIT=$?

echo "📦 Building Frontend..."
cd ../todo-frontend && npm run build
FRONTEND_BUILD_EXIT=$?

cd ..

echo ""
echo "================================================"

# Final Summary
echo "📊 COMPREHENSIVE ERROR CHECK SUMMARY"
echo "================================================"
echo "TypeScript Types: $([ $TYPE_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "ESLint Quality:   $([ $LINT_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Test Suite:       $([ $TEST_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Backend Build:    $([ $BACKEND_BUILD_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Frontend Build:   $([ $FRONTEND_BUILD_EXIT -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "================================================"

# Exit with error if any check failed
if [ $TYPE_EXIT -ne 0 ] || [ $LINT_EXIT -ne 0 ] || [ $TEST_EXIT -ne 0 ] || [ $BACKEND_BUILD_EXIT -ne 0 ] || [ $FRONTEND_BUILD_EXIT -ne 0 ]; then
    echo "❌ Some checks failed! Please review the output above."
    exit 1
else
    echo "✅ ALL CHECKS PASSED! Your codebase is healthy! 🎉"
    exit 0
fi