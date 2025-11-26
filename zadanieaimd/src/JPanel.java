import java.awt.*;

public class JPanel extends javax.swing.JPanel {

    public JPanel() {
        setPreferredSize(new Dimension(400, 400));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        Graphics2D g2d = (Graphics2D) g;

        g2d.drawRect(10, 10, 380, 380);

        g2d.setColor(Color.BLUE);
        g2d.fillOval(50, 50, 100, 100);

        g2d.setColor(Color.RED);
        g2d.drawLine(200, 50, 300, 150);

        g2d.setColor(Color.BLACK);
        g2d.drawString("Witamy w Java Swing!", 150, 200);
    }
}