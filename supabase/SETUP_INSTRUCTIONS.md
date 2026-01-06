# Database Setup Instructions

## Files Created

1. **`add_comments_table.sql`** - Creates the `article_comments` table
2. **`complete_articles_and_comments.sql`** - Complete setup (recommended):
   - Creates comments table
   - Adds full content to all articles
   - Adds realistic comments to each article

## How to Run

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open `complete_articles_and_comments.sql`
4. Copy and paste the entire contents
5. Click **Run** or press `Ctrl+Enter`

### Option 2: Supabase CLI
```bash
cd c:\Users\robin\tournaments
supabase db execute -f supabase/complete_articles_and_comments.sql
```

## What This Does

### 1. Creates Comments Table
- `article_comments` table with proper structure
- Supports nested replies (parent_id)
- Includes likes, dislikes, verification, pinning
- Row Level Security (RLS) enabled
- Proper indexes for performance

### 2. Adds Full Content to Articles
- Updates all published articles with comprehensive content
- Content is generated based on article category
- Each article gets detailed, realistic content

### 3. Adds Comments to Articles
- Adds 4-8 comments per article
- Each comment has realistic author names and content
- Some comments have 1-3 replies
- Comments have likes/dislikes, verification status
- One comment per article is pinned
- Comments are distributed over the last 30 days

## Comment Structure

The comments table supports:
- **Top-level comments**: Direct replies to articles
- **Nested replies**: Replies to comments (via parent_id)
- **User verification**: Some authors are marked as verified
- **Pinning**: Important comments can be pinned
- **Likes/Dislikes**: Engagement metrics
- **Soft deletes**: Comments can be marked as deleted

## After Running

Once you run the SQL:
1. Articles will have full content
2. Each article will have 4-8 comments with replies
3. The UI will automatically fetch and display comments from the database
4. Comments will be properly structured with nested replies

## Verification

After running, you can verify with:
```sql
SELECT 
    (SELECT COUNT(*) FROM news_articles WHERE content IS NOT NULL AND content != '') as articles_with_content,
    (SELECT COUNT(*) FROM article_comments) as total_comments,
    (SELECT COUNT(*) FROM article_comments WHERE parent_id IS NULL) as top_level_comments,
    (SELECT COUNT(*) FROM article_comments WHERE parent_id IS NOT NULL) as replies;
```




