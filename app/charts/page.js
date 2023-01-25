'use client'

import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function Chart() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/charts">
          Chart
        </Link>
      </Breadcrumbs>
    </div>
  );
}
