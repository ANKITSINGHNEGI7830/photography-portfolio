# Mara Voss Photography — Portfolio Site

A single-page static photography portfolio. Plain HTML/CSS/JS — no framework,
no build step required to run it. `package.json` just wires up a local dev
server and an S3 deploy script.

## Project structure

```
.
├── index.html              # the whole site
├── images/                 # drop your photos here
├── package.json
├── .gitignore
└── .github/workflows/
    └── deploy.yml          # auto-deploys to S3 on push to main (optional)
```

## Getting started

```bash
npm install
npm run dev
```

Opens the site at `http://localhost:8080`.

## Adding your own photos

1. Add image files to `images/`.
2. In `index.html`, replace each placeholder `src="https://picsum.photos/..."`
   with your file path, e.g. `src="images/coastline.jpg"`.
3. Update the matching `alt="..."` text to describe the real photo.
4. Update the name, bio, and contact links in the About/Contact sections.

## Deploying to S3 manually

Requires the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
configured with credentials that can write to your bucket.

```bash
export BUCKET_NAME=your-bucket-name
npm run deploy
```

Then, one-time bucket setup (console or CLI):

1. **S3 → your bucket → Properties → Static website hosting** → Enable,
   set index document to `index.html`.
2. **Permissions** → allow public read (bucket policy) or put a CloudFront
   distribution in front of it for HTTPS + a custom domain.

## Auto-deploy from GitHub (optional)

`.github/workflows/deploy.yml` pushes to S3 automatically whenever you push
to `main`. To enable it, add these to your repo's
**Settings → Secrets and variables → Actions**:

| Secret                     | Value                                              |
|----------------------------|-----------------------------------------------------|
| `AWS_ROLE_ARN`             | IAM role ARN configured for GitHub OIDC             |
| `AWS_REGION`               | e.g. `us-east-1`                                    |
| `S3_BUCKET_NAME`           | your bucket name                                    |
| `CLOUDFRONT_DISTRIBUTION_ID` | optional, only if using CloudFront                |

If you'd rather use a static access key/secret instead of OIDC, swap the
`configure-aws-credentials` step in `deploy.yml` for `aws-access-key-id` /
`aws-secret-access-key` secrets — OIDC is recommended since no long-lived
keys are stored in GitHub.

## Pushing this to GitHub

```bash
git init
git add .
git commit -m "Initial commit: photography portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
