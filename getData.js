const { Octokit } = require("@octokit/rest");
const fs = require('fs');

// get token from GitHub Actions
const token = process.env.PAT_TOKEN;
const octokit = new Octokit({ auth: token });

async function getHistoricalData() {
  const owner = 'TharangaJ123'; 
  const repo = 'ci-cd-practise-01'; 

  try {
    console.log("Data getting, wait...");

    // 1. Commits data 
    const commits = await octokit.rest.repos.listCommits({ owner, repo });

    // 2. Pull Requests data
    const prs = await octokit.rest.pulls.list({ owner, repo, state: 'all' });


    // 3. CI/CD Deployment Logs 
    const runs = await octokit.rest.actions.listWorkflowRunsForRepo({ owner, repo });
    
    if (runs.data.workflow_runs.length > 0) {
      console.log(`Latest Run Status: ${runs.data.workflow_runs[0].conclusion}`);
    }

    // Save karanna one data tika eka object ekakata damu
    const reportData = {
      timestamp: new Date().toISOString(),
      totalCommits: commits.data.length,
      latestCommitMessage: commits.data[0].commit.message,
      totalPRs: prs.data.length,
      totalWorkflowRuns: runs.data.workflow_runs.length,
      latestRunStatus: runs.data.workflow_runs.length > 0 ? runs.data.workflow_runs[0].conclusion : 'No runs'
    };

    // Object eka JSON file ekakata save karamu
    fs.writeFileSync('github-report.json', JSON.stringify(reportData, null, 2));

    console.log("Done! Data saved on 'github-report.json' file.");

  } catch (error) {
    console.error("Got a Error:", error.message);
  }
}

getHistoricalData();