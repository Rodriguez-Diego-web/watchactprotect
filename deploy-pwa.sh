#!/bin/bash

# 🚀 WATCH.ACT.PROTECT PWA Deployment Script
# Automatisiertes Deployment der Progressive Web App

echo "🚀 Starting WATCH.ACT.PROTECT PWA Deployment..."
echo "=================================================="

# Farben für bessere Lesbarkeit
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funktionen
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Dependencies prüfen
echo ""
print_info "Checking dependencies..."

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi

print_success "Dependencies OK"

# 2. Dependencies installieren
echo ""
print_info "Installing dependencies..."
npm ci
if [ $? -eq 0 ]; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# 3. Tests ausführen
echo ""
print_info "Running tests..."
npm run test -- --run
if [ $? -eq 0 ]; then
    print_success "All tests passed"
else
    print_warning "Some tests failed, but continuing deployment"
fi

# 4. Linting
echo ""
print_info "Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    print_success "Linting passed"
else
    print_warning "Linting issues found, but continuing deployment"
fi

# 5. PWA Build
echo ""
print_info "Building PWA..."
npm run build:pwa
if [ $? -eq 0 ]; then
    print_success "PWA build completed"
else
    print_error "PWA build failed"
    exit 1
fi

# 6. Build-Größe prüfen
echo ""
print_info "Checking build size..."
BUILD_SIZE=$(du -sh dist | cut -f1)
print_info "Total build size: $BUILD_SIZE"

# 7. PWA-Validierung
echo ""
print_info "Validating PWA..."

# Prüfe ob wichtige PWA-Dateien existieren
if [ -f "dist/manifest.webmanifest" ]; then
    print_success "Web App Manifest found"
else
    print_error "Web App Manifest missing"
    exit 1
fi

if [ -f "dist/sw.js" ]; then
    print_success "Service Worker found"
else
    print_error "Service Worker missing"
    exit 1
fi

if [ -f "dist/registerSW.js" ]; then
    print_success "Service Worker registration found"
else
    print_error "Service Worker registration missing"
    exit 1
fi

# 8. Sicherheitsprüfung
echo ""
print_info "Security check..."
if grep -q "https://" dist/index.html; then
    print_success "HTTPS references found"
else
    print_warning "No HTTPS references found - ensure HTTPS in production"
fi

# 9. Performance-Hinweise
echo ""
print_info "Performance recommendations:"
echo "  • Serve over HTTPS"
echo "  • Enable Gzip/Brotli compression"
echo "  • Set proper cache headers"
echo "  • Use CDN for static assets"
echo "  • Monitor Core Web Vitals"

# 10. Deployment-Optionen
echo ""
print_info "Deployment options:"
echo ""
echo "📁 Static Hosting (Recommended):"
echo "  • Netlify: drag & drop dist/ folder"
echo "  • Vercel: vercel --prod"
echo "  • GitHub Pages: push dist/ to gh-pages branch"
echo "  • Firebase: firebase deploy"
echo ""
echo "🐳 Docker:"
echo "  • docker build -t watch-act-protect-pwa ."
echo "  • docker run -p 80:80 watch-act-protect-pwa"
echo ""
echo "☁️  Cloud Platforms:"
echo "  • AWS S3 + CloudFront"
echo "  • Google Cloud Storage + CDN"
echo "  • Azure Static Web Apps"

# 11. Post-Deployment Checkliste
echo ""
print_info "Post-deployment checklist:"
echo "  □ Test PWA installation on mobile devices"
echo "  □ Verify offline functionality"
echo "  □ Check service worker updates"
echo "  □ Run Lighthouse PWA audit"
echo "  □ Test on different browsers"
echo "  □ Verify HTTPS certificate"
echo "  □ Monitor performance metrics"

# 12. Lighthouse-Test (optional)
echo ""
read -p "🔍 Run Lighthouse PWA audit? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v lighthouse &> /dev/null; then
        print_info "Running Lighthouse audit..."
        npm run preview:pwa &
        PREVIEW_PID=$!
        sleep 5
        lighthouse http://localhost:3000 --only-categories=pwa --output=html --output-path=lighthouse-pwa-report.html
        kill $PREVIEW_PID
        print_success "Lighthouse report saved to lighthouse-pwa-report.html"
    else
        print_warning "Lighthouse not installed. Install with: npm install -g lighthouse"
    fi
fi

# 13. Abschluss
echo ""
echo "=================================================="
print_success "PWA Deployment preparation completed!"
echo ""
print_info "Next steps:"
echo "  1. Upload dist/ folder to your hosting provider"
echo "  2. Ensure HTTPS is enabled"
echo "  3. Test PWA installation"
echo "  4. Monitor performance and usage"
echo ""
print_success "WATCH.ACT.PROTECT PWA is ready to make a difference! 🌟"
echo "==================================================" 