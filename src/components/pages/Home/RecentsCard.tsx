import Card from "@mui/material/Card"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export const RecentCard: React.FC = () => {
    return(
        <Card elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: "12px", p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", mb: 1.5 }}>
              Recientes
            </Typography>

            <List disablePadding>
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <PersonOutlineIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "#374151" }}>
                      García López, María E.
                    </Typography>
                  }
                />
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  hace 5 min
                </Typography>
              </ListItem>

              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <AssessmentOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "#374151" }}>
                      Reporte de Inscripción
                    </Typography>
                  }
                />
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  hace 1 h
                </Typography>
              </ListItem>

              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "#374151" }}>
                      Folio A1–2026–0042
                    </Typography>
                  }
                />
                <Typography variant="caption" sx={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                  ayer
                </Typography>
              </ListItem>
            </List>
          </Card>
    )
}