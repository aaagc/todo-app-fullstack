#!/bin/bash

# Todo App - Documentation Summary Script
# This script provides a comprehensive overview of all project documentation

echo "=== TODO APP DOCUMENTATION SUMMARY ==="
echo ""
echo "📁 Main Project Documentation:"
ls -la /workspace/README.md
echo ""

echo "📁 Comprehensive Documentation (/workspace/docs/):"
ls -la /workspace/docs/
echo ""

echo "📁 Backend Team Documentation:"
ls -la /workspace/todo-backend/README.md
echo ""

echo "📁 Frontend Team Documentation:"
ls -la /workspace/todo-frontend/README.md
echo ""

echo "=== LINE COUNTS ==="
echo "Main README: $(wc -l < /workspace/README.md) lines"
echo "System Design: $(wc -l < /workspace/docs/SYSTEM_DESIGN.md) lines"
echo "API Specification: $(wc -l < /workspace/docs/API_SPECIFICATION.md) lines"
echo "Project Overview: $(wc -l < /workspace/docs/OVERVIEW.md) lines"
echo "Backend README: $(wc -l < /workspace/todo-backend/README.md) lines"
echo "Frontend README: $(wc -l < /workspace/todo-frontend/README.md) lines"
echo ""

echo "=== TOTAL DOCUMENTATION METRICS ==="
TOTAL_LINES=$(($(wc -l < /workspace/README.md) + $(wc -l < /workspace/docs/SYSTEM_DESIGN.md) + $(wc -l < /workspace/docs/API_SPECIFICATION.md) + $(wc -l < /workspace/docs/OVERVIEW.md) + $(wc -l < /workspace/todo-backend/README.md) + $(wc -l < /workspace/todo-frontend/README.md)))
echo "Total Lines: $TOTAL_LINES"
echo "Total Files: 6"
echo "Documentation Coverage: Complete (Architecture, API, Frontend, Backend)"
echo "Last Updated: $(date +%Y-%m-%d)"
echo ""

echo "=== QUICK ACCESS LINKS ==="
echo "🎯 Project Overview: ./docs/OVERVIEW.md"
echo "📋 System Design: ./docs/SYSTEM_DESIGN.md"
echo "🔌 API Specification: ./docs/API_SPECIFICATION.md"
echo "⚙️ Backend Guide: ./todo-backend/README.md"
echo "🎨 Frontend Guide: ./todo-frontend/README.md"
echo ""

echo "=== USAGE ==="
echo "Run this script anytime to get current documentation status:"
echo "bash docs-summary.sh"
echo ""
echo "For role-specific guidance, see the main README.md"