import {Box, Container, Typography} from "@mui/material";

export default function Hero() {
    return (
        <Box sx={{background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)", py: {xs: 4, md: 6}}}>
            <Container maxWidth="md" sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, flexWrap: "wrap"
            }}>
                <Box sx={{flex: 1, minWidth: 260}}>
                    <Typography variant="h4" sx={{fontWeight: 800, color: "#1a237e"}}>
                        Manage your team in one place
                    </Typography>
                    <Typography sx={{mt: 1.5, color: "text.secondary"}}>
                        Add employees and see them instantly. Deployed on Kubernetes (k3s) on AWS,
                        provisioned with Terraform and delivered through a CI/CD pipeline.
                    </Typography>
                </Box>
                <svg width="280" height="200" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="140" cy="100" rx="130" ry="90" fill="#ffffff" opacity="0.6"/>
                    <rect x="50" y="40" width="180" height="110" rx="12" fill="#fff" stroke="#90caf9" strokeWidth="2"/>
                    <rect x="64" y="54" width="60" height="8" rx="4" fill="#1976d2"/>
                    <rect x="64" y="74" width="152" height="6" rx="3" fill="#e0e0e0"/>
                    <rect x="64" y="90" width="152" height="6" rx="3" fill="#e0e0e0"/>
                    <rect x="64" y="106" width="110" height="6" rx="3" fill="#e0e0e0"/>
                    <circle cx="70" cy="132" r="7" fill="#7b1fa2"/>
                    <circle cx="90" cy="132" r="7" fill="#2e7d32"/>
                    <circle cx="110" cy="132" r="7" fill="#ed6c02"/>
                    <circle cx="225" cy="45" r="22" fill="#1976d2"/>
                    <circle cx="225" cy="40" r="6" fill="#fff"/>
                    <path d="M212 58c0-7 6-11 13-11s13 4 13 11z" fill="#fff"/>
                </svg>
            </Container>
        </Box>
    );
}