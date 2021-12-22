---
layout: results.njk
title: ARIA-AT Automated Test Results
---
# ARIA-AT Automated Test Results

## Test results

These test results are generated with [at-driver](https://github.com/bocoup/at-automation-experiment) and [aria-at-harness](https://github.com/bocoup/aria-at-harness).
Note that no assertions are currently run, only output is collected.
Therefore, it is not possible to assert any pass rate from the table below.
Each row has a link to a more detailed view for that test plan which shows the event log and output for each subtest.

Some test plans are skipped in automation because the test instructions are not currently automatable.
See [aria-at issue #443](https://github.com/w3c/aria-at/issues/443).

The information in this report is generated from candidate tests.
Candidate aria-at tests are in review by assistive technology developers and lack consensus regarding:

1. applicability and validity of the tests, and
2. accuracy of test results.

{% resultsTable results, tests %}
