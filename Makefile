# State Research Tracker - Build and Data Management

.PHONY: sync build dev install

# Sync data from Supabase to static JSON files
# Requires: SUPABASE_KEY environment variable (or sourced from .env)
sync:
	@echo "Syncing data from Supabase..."
	@if [ -f .env ]; then \
		export $$(cat .env | grep -v '^#' | xargs) && \
		python scripts/sync_from_supabase.py; \
	else \
		python scripts/sync_from_supabase.py; \
	fi

# Build the production app
build: sync
	npm run build

# Run development server
dev:
	npm run dev

# Install dependencies
install:
	npm install
	pip install supabase

# Migrate existing data to Supabase (one-time)
migrate:
	@echo "Running migration (use --dry-run first)..."
	@if [ -f .env ]; then \
		export $$(cat .env | grep -v '^#' | xargs) && \
		python scripts/migrate_to_supabase.py; \
	else \
		python scripts/migrate_to_supabase.py; \
	fi
