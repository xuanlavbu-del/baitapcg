import javax.swing.*;
import java.awt.*;
import java.text.DecimalFormat;

public class chuyendoitiente {

    static DecimalFormat df = new DecimalFormat("#,###.##");

    public static void main(String[] args) {

        JFrame frame = new JFrame("💱 Currency Converter PRO");
        frame.setSize(450, 300);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(6, 2, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        Font font = new Font("Arial", Font.BOLD, 14);

        // Input
        JLabel lblAmount = new JLabel("Số tiền:");
        lblAmount.setFont(font);
        JTextField txtAmount = new JTextField();

        // Currency
        String[] money = {"VND", "USD", "EUR", "JPY"};
        JComboBox<String> from = new JComboBox<>(money);
        JComboBox<String> to = new JComboBox<>(money);

        // Result
        JLabel lblResult = new JLabel("Kết quả: ");
        lblResult.setFont(new Font("Arial", Font.BOLD, 16));
        lblResult.setForeground(Color.BLUE);

        // Buttons
        JButton btnConvert = new JButton("Chuyển đổi");
        JButton btnSwap = new JButton("Đảo chiều");
        JButton btnClear = new JButton("Reset");

        // Action Convert
        btnConvert.addActionListener(e -> {
            try {
                double amount = Double.parseDouble(txtAmount.getText());
                String f = (String) from.getSelectedItem();
                String t = (String) to.getSelectedItem();

                double result = convert(amount, f, t);
                lblResult.setText("Kết quả: " + df.format(result) + " " + t);

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(frame, "❌ Nhập số hợp lệ!");
            }
        });

        // Swap
        btnSwap.addActionListener(e -> {
            int temp = from.getSelectedIndex();
            from.setSelectedIndex(to.getSelectedIndex());
            to.setSelectedIndex(temp);
        });

        // Clear
        btnClear.addActionListener(e -> {
            txtAmount.setText("");
            lblResult.setText("Kết quả:");
        });

        // Add components
        panel.add(lblAmount);
        panel.add(txtAmount);

        panel.add(new JLabel("Từ:"));
        panel.add(from);

        panel.add(new JLabel("Sang:"));
        panel.add(to);

        panel.add(btnConvert);
        panel.add(btnSwap);

        panel.add(btnClear);
        panel.add(new JLabel(""));

        panel.add(lblResult);

        frame.add(panel);
        frame.setVisible(true);
    }

    // Logic chuyển đổi
    public static double convert(double amount, String from, String to) {

        double rateVND = 1;
        double rateUSD = 24000;
        double rateEUR = 26000;
        double rateJPY = 160;

        double vnd = 0;

        switch (from) {
            case "VND": vnd = amount; break;
            case "USD": vnd = amount * rateUSD; break;
            case "EUR": vnd = amount * rateEUR; break;
            case "JPY": vnd = amount * rateJPY; break;
        }

        switch (to) {
            case "VND": return vnd;
            case "USD": return vnd / rateUSD;
            case "EUR": return vnd / rateEUR;
            case "JPY": return vnd / rateJPY;
        }

        return 0;
    }
}